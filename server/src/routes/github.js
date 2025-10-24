import express from 'express';

const router = express.Router();

// Environment variable checks
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_REDIRECT_URI = process.env.GITHUB_REDIRECT_URI;

// Validate required environment variables at router load time
if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET || !GITHUB_REDIRECT_URI) {
  console.warn('⚠️  GitHub OAuth Configuration Warning:');
  if (!GITHUB_CLIENT_ID) {
    console.warn('  - GITHUB_CLIENT_ID is not set');
  }
  if (!GITHUB_CLIENT_SECRET) {
    console.warn('  - GITHUB_CLIENT_SECRET is not set');
  }
  if (!GITHUB_REDIRECT_URI) {
    console.warn('  - GITHUB_REDIRECT_URI is not set');
  }
  console.warn('  GitHub PR Mode endpoints will not function properly without these values.');
}

/**
 * GET /api/github/login
 * Initiates GitHub OAuth flow
 * 
 * Redirects user to GitHub authorization URL with proper OAuth parameters.
 * User will be prompted to authorize the app on GitHub.
 * 
 * Expected query params: None
 * Returns: Redirect to GitHub OAuth authorization page
 */
router.get('/login', (req, res) => {
  // Validate required environment variables
  if (!GITHUB_CLIENT_ID || !GITHUB_REDIRECT_URI) {
    console.error('❌ GitHub OAuth login failed: Missing configuration');
    return res.status(500).json({
      error: 'GitHub OAuth not configured',
      message: 'Missing GITHUB_CLIENT_ID or GITHUB_REDIRECT_URI environment variables',
      details: {
        clientIdPresent: !!GITHUB_CLIENT_ID,
        redirectUriPresent: !!GITHUB_REDIRECT_URI
      }
    });
  }

  // Construct GitHub OAuth authorization URL
  const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
  githubAuthUrl.searchParams.append('client_id', GITHUB_CLIENT_ID);
  githubAuthUrl.searchParams.append('redirect_uri', GITHUB_REDIRECT_URI);
  githubAuthUrl.searchParams.append('scope', 'repo');
  githubAuthUrl.searchParams.append('allow_signup', 'true');

  res.redirect(githubAuthUrl.toString());
});

/**
 * GET /api/github/callback
 * Handles GitHub OAuth callback
 * 
 * Exchanges the authorization code for an access token and redirects
 * the user to the frontend with the token.
 * 
 * Expected query params: code
 * Returns: Redirect to client app with token
 */
router.get('/callback', async (req, res) => {
  const { code } = req.query;
  
  // Validate authorization code
  if (!code) {
    console.error('❌ GitHub OAuth callback failed: Missing authorization code');
    return res.status(400).json({
      error: 'Missing authorization code'
    });
  }

  // Validate environment variables
  if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    console.error('❌ GitHub OAuth callback failed: Missing configuration');
    return res.status(500).json({
      error: 'GitHub OAuth not configured',
      message: 'Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET environment variables'
    });
  }

  try {
    console.log('🔄 Exchanging authorization code for access token...');

    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: code
      })
    });

    if (!tokenResponse.ok) {
      throw new Error(`GitHub API responded with status ${tokenResponse.status}`);
    }

    const tokenData = await tokenResponse.json();

    // Check for errors in GitHub's response
    if (tokenData.error) {
      console.error('❌ GitHub OAuth error:', tokenData.error_description || tokenData.error);
      return res.status(500).json({
        error: 'GitHub OAuth failed',
        message: tokenData.error_description || tokenData.error
      });
    }

    // Extract access token
    const accessToken = tokenData.access_token;
    
    if (!accessToken) {
      console.error('❌ No access token in GitHub response');
      return res.status(500).json({
        error: 'GitHub OAuth failed',
        message: 'No access token received from GitHub'
      });
    }

    console.log('✅ Access token obtained successfully');

    // Redirect to frontend with token
    const frontendUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const redirectUrl = `${frontendUrl}/?token=${accessToken}`;
    
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('❌ GitHub OAuth callback error:', error.message);
    res.status(500).json({
      error: 'GitHub OAuth failed',
      message: error.message
    });
  }
});

/**
 * GET /api/github/repos
 * Fetches user's GitHub repositories
 * 
 * Retrieves a list of repositories accessible to the authenticated user.
 * Requires a valid GitHub access token in the Authorization header.
 * 
 * Expected headers: Authorization (Bearer token)
 * Returns: JSON object with repos array
 */
router.get('/repos', async (req, res) => {
  // Extract access token from Authorization header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.error('❌ GitHub repos request failed: Missing access token');
    return res.status(401).json({
      error: 'Missing access token',
      message: 'Authorization header with Bearer token is required'
    });
  }

  const accessToken = authHeader.substring(7); // Remove "Bearer " prefix

  if (!accessToken) {
    console.error('❌ GitHub repos request failed: Empty access token');
    return res.status(401).json({
      error: 'Missing access token'
    });
  }

  try {
    console.log('📦 Fetching GitHub repositories...');

    // Fetch user's repositories from GitHub API
    const reposResponse = await fetch('https://api.github.com/user/repos', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'AIReviewMate'
      }
    });

    // Handle authentication errors
    if (reposResponse.status === 401) {
      console.error('❌ GitHub authentication failed: Invalid or expired token');
      return res.status(401).json({
        error: 'Invalid or expired token',
        message: 'Please re-authenticate with GitHub'
      });
    }

    if (!reposResponse.ok) {
      throw new Error(`GitHub API responded with status ${reposResponse.status}`);
    }

    const reposData = await reposResponse.json();

    // Extract and format relevant repository information
    const repos = reposData.map(repo => ({
      name: repo.name,
      full_name: repo.full_name,
      owner: repo.owner.login,
      default_branch: repo.default_branch,
      url: repo.html_url
    }));

    console.log(`✅ Retrieved ${repos.length} repositories`);

    res.json({
      repos: repos
    });
  } catch (error) {
    console.error('❌ GitHub repos fetch error:', error.message);
    res.status(500).json({
      error: 'Failed to fetch repositories',
      message: error.message
    });
  }
});

/**
 * POST /api/github/pull-request
 * Creates a pull request with AI-reviewed code
 * 
 * Creates a new branch, commits the improved code, and opens a pull request
 * against the main branch with AI review suggestions.
 * 
 * Expected body: { accessToken, owner, repo, filePath, improvedCode, category, explanation }
 * Returns: PR details object with URL
 */
router.post('/pull-request', async (req, res) => {
  const { accessToken, owner, repo, filePath, improvedCode, category, explanation } = req.body;
  
  // Validate required fields
  const missingParams = [];
  if (!accessToken) missingParams.push('accessToken');
  if (!owner) missingParams.push('owner');
  if (!repo) missingParams.push('repo');
  if (!filePath) missingParams.push('filePath');
  if (!improvedCode) missingParams.push('improvedCode');
  if (!category) missingParams.push('category');
  if (!explanation) missingParams.push('explanation');
  
  if (missingParams.length > 0) {
    console.error('❌ PR creation failed: Missing required fields:', missingParams);
    return res.status(400).json({
      error: 'Missing required fields',
      missing: missingParams
    });
  }

  // Generate unique branch name
  const branchName = `aireviewmate-update-${Date.now()}`;
  
  const githubApiHeaders = {
    'Authorization': `Bearer ${accessToken}`,
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'AIReviewMate'
  };

  try {
    console.log(`🚀 Creating PR for ${owner}/${repo}:${filePath}`);

    // Step A: Fetch base branch (main) SHA
    console.log('📍 Step 1: Fetching main branch SHA...');
    const refResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/refs/heads/main`,
      {
        method: 'GET',
        headers: githubApiHeaders
      }
    );

    if (refResponse.status === 401) {
      console.error('❌ GitHub authentication failed');
      return res.status(401).json({
        error: 'Invalid or expired token',
        message: 'Please re-authenticate with GitHub'
      });
    }

    if (!refResponse.ok) {
      const errorData = await refResponse.json().catch(() => ({}));
      console.error('❌ Failed to fetch main branch:', errorData);
      throw new Error(`Failed to fetch main branch: ${refResponse.status}`);
    }

    const refData = await refResponse.json();
    const mainBranchSHA = refData.object.sha;
    console.log(`✅ Main branch SHA: ${mainBranchSHA.substring(0, 7)}`);

    // Step B: Create new branch
    console.log(`📍 Step 2: Creating branch ${branchName}...`);
    const createBranchResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/refs`,
      {
        method: 'POST',
        headers: githubApiHeaders,
        body: JSON.stringify({
          ref: `refs/heads/${branchName}`,
          sha: mainBranchSHA
        })
      }
    );

    if (createBranchResponse.status === 409) {
      console.error('❌ Branch conflict: Branch already exists');
      return res.status(409).json({
        error: 'Branch conflict',
        message: 'A branch with this name already exists. Please try again.'
      });
    }

    if (!createBranchResponse.ok) {
      const errorData = await createBranchResponse.json().catch(() => ({}));
      console.error('❌ Failed to create branch:', errorData);
      throw new Error(`Failed to create branch: ${createBranchResponse.status}`);
    }

    console.log(`✅ Branch created: ${branchName}`);

    // Step C: Get current file info
    console.log(`📍 Step 3: Fetching file info for ${filePath}...`);
    const fileResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
      {
        method: 'GET',
        headers: githubApiHeaders
      }
    );

    if (!fileResponse.ok) {
      const errorData = await fileResponse.json().catch(() => ({}));
      console.error('❌ Failed to fetch file:', errorData);
      throw new Error(`Failed to fetch file: ${fileResponse.status}`);
    }

    const fileData = await fileResponse.json();
    const fileSHA = fileData.sha;
    console.log(`✅ File SHA: ${fileSHA.substring(0, 7)}`);

    // Step D: Commit improved code
    console.log('📍 Step 4: Committing improved code...');
    const improvedCodeBase64 = Buffer.from(improvedCode).toString('base64');
    
    const commitResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: githubApiHeaders,
        body: JSON.stringify({
          message: `AIReviewMate: ${category}`,
          content: improvedCodeBase64,
          sha: fileSHA,
          branch: branchName
        })
      }
    );

    if (!commitResponse.ok) {
      const errorData = await commitResponse.json().catch(() => ({}));
      console.error('❌ Failed to commit code:', errorData);
      throw new Error(`Failed to commit code: ${commitResponse.status}`);
    }

    console.log('✅ Code committed successfully');

    // Step E: Create Pull Request
    console.log('📍 Step 5: Creating pull request...');
    const prResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/pulls`,
      {
        method: 'POST',
        headers: githubApiHeaders,
        body: JSON.stringify({
          title: `AI Review Suggestion: ${category}`,
          head: branchName,
          base: 'main',
          body: explanation
        })
      }
    );

    if (!prResponse.ok) {
      const errorData = await prResponse.json().catch(() => ({}));
      console.error('❌ Failed to create pull request:', errorData);
      throw new Error(`Failed to create PR: ${prResponse.status} - ${errorData.message || 'Unknown error'}`);
    }

    const prData = await prResponse.json();
    const prUrl = prData.html_url;
    const prNumber = prData.number;

    console.log(`✅ Pull request created: #${prNumber}`);

    // Step F: Return success
    res.json({
      success: true,
      url: prUrl,
      number: prNumber,
      branch: branchName
    });

  } catch (error) {
    console.error('❌ PR creation error:', error.message);
    res.status(500).json({
      error: 'Failed to create pull request',
      message: error.message
    });
  }
});

export default router;
