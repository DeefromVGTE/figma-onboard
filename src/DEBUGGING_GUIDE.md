# Onboard.AI - AI Testing Debugging Guide

## 🔧 What Was Fixed

### Backend Improvements (ai.tsx)
I've added comprehensive error handling and debugging to all AI functions:

1. **Enhanced Error Messages**
   - Specific error messages for different OpenAI API status codes (401, 429, 500)
   - Better logging with emojis for easy visual scanning
   - Detailed JSON parsing error messages

2. **Better Logging**
   - ✅ Success indicators
   - ❌ Error indicators  
   - 🤖 API call indicators
   - 📄 Response preview logging

3. **Try-Catch Blocks**
   - All AI functions now have try-catch blocks around JSON parsing
   - More descriptive error messages when parsing fails

### Frontend Improvements (TestAIPage.tsx)
1. **Added API Key Configuration Test (Test #0)**
   - New diagnostic test that checks if the server is reachable
   - Helps identify connection issues before testing AI features
   - Run this FIRST to verify basic connectivity

2. **Better Error Display**
   - Errors now show in a prominent red card at the top
   - Console logs for debugging
   - Clear error messages indicating what went wrong

## 🧪 How to Debug Test Failures

### Step 1: Check Server Connection
1. Click on **"0. Test API Key Configuration"** first
2. This verifies:
   - The Supabase server is reachable
   - Your backend is deployed and running
   - Basic network connectivity works

**Expected Result**: "✅ Server is reachable and healthy"

**If it fails**: 
- Check that your Supabase project is active
- Verify the Edge Function is deployed
- Check browser console for network errors

### Step 2: Open Browser Developer Console
Before running any tests:
1. Press F12 (Chrome/Edge) or Cmd+Option+I (Mac)
2. Go to the "Console" tab
3. Keep it open while running tests

You'll see detailed logs like:
```
🔍 Testing API key configuration...
✅ Health check response: { status: "ok" }
🤖 Calling OpenAI API with model: gpt-4o-mini
✅ OpenAI API response received
📄 Cleaned response: {"skills": ["React", ...
```

### Step 3: Check for Specific Errors

#### Error: "OpenAI API key not configured"
**Cause**: The OPENAI_API_KEY environment variable is not set in Supabase
**Solution**: 
1. Go to your Supabase Dashboard
2. Navigate to Project Settings → Edge Functions → Secrets
3. Add a new secret: `OPENAI_API_KEY` with your OpenAI API key
4. Redeploy the Edge Function

#### Error: "OpenAI API authentication failed"
**Cause**: The API key is invalid or expired
**Solution**:
1. Verify your OpenAI API key at https://platform.openai.com/api-keys
2. Make sure it's a valid key (starts with sk-)
3. Update the secret in Supabase if needed

#### Error: "Failed to parse AI response"
**Cause**: OpenAI returned data in an unexpected format
**Solution**:
1. Check the console logs for "📄 Cleaned response"
2. The response should be valid JSON
3. If it's wrapped in markdown code blocks, the stripMarkdownCodeBlocks function should handle it
4. If issue persists, the OpenAI prompt might need adjustment

#### Error: "Network error: ..."
**Cause**: Frontend cannot reach the backend server
**Solution**:
1. Check that the Supabase Edge Function is deployed
2. Verify the project ID is correct in /utils/supabase/info.tsx
3. Check for CORS issues in browser console

#### Error: "OAuth Error: ..."
**Cause**: OAuth provider (Google/LinkedIn) is not configured
**Solution**:
1. Go to Supabase Dashboard → Authentication → Providers
2. Enable the provider (Google or LinkedIn)
3. Follow the provider-specific setup instructions
4. Add redirect URLs: `https://YOUR_PROJECT.supabase.co/auth/v1/callback`

## 🎯 Testing Workflow

### For AI Features:
1. **Test #0**: API Key Configuration (verify server is reachable)
2. If successful, try any of the 6 AI tests:
   - Test #1: Analyze Artifacts
   - Test #2: Job Ready Score
   - Test #3: Generate Curriculum
   - Test #4: Analyze Resume
   - Test #5: Match Candidate
   - Test #6: Generate Feedback

3. Check console logs for detailed execution flow
4. If any test fails, check the error message and logs

### For OAuth Features:
1. Configure the provider in Supabase Dashboard first
2. Test Google OAuth or LinkedIn OAuth
3. Check Current Session to verify authentication

## 📊 Expected Response Times

- **API Key Test**: < 1 second
- **AI Tests**: 5-15 seconds each (depends on OpenAI API response time)
- **OAuth Tests**: Immediate redirect (or error if not configured)

## 🔍 Common Issues and Solutions

### Issue: All tests fail immediately
**Check**: 
- Is your Supabase Edge Function deployed?
- Is the projectId correct in the code?
- Open browser console and look for errors

### Issue: "OpenAI API key not configured" but I added it
**Check**:
- Did you redeploy the Edge Function after adding the secret?
- Is the secret named exactly "OPENAI_API_KEY" (case-sensitive)?
- Wait a few seconds after adding the secret and try again

### Issue: Tests work but responses are empty
**Check**:
- Look at console logs for "📄 Cleaned response"
- The response might be malformed
- Try adjusting the temperature parameter in the AI prompts

### Issue: "Failed to parse AI response: SyntaxError"
**Check**:
- OpenAI sometimes wraps JSON in markdown code blocks
- The stripMarkdownCodeBlocks function should handle this
- Check console for the raw response before cleaning

## 🚀 Next Steps After Testing

Once all tests pass:
1. Integrate AI features into your actual application pages
2. Add loading states and error handling to your UI
3. Monitor OpenAI API usage and costs
4. Consider adding rate limiting for production

## 📝 Monitoring Logs

To see detailed server-side logs:
1. Go to Supabase Dashboard → Edge Functions
2. Click on "make-server-455660d1"
3. View the "Logs" tab
4. You'll see all console.log output from the backend

Look for:
- 🤖 API calls being made
- ✅ Successful responses
- ❌ Errors with details
- 📄 Response previews

## 💡 Tips

1. **Always check Test #0 first** - It's the quickest way to verify basic functionality
2. **Keep console open** - Most debugging info is logged there
3. **Check both frontend AND backend logs** - Frontend console + Supabase Edge Function logs
4. **Start simple** - Test one feature at a time
5. **Verify secrets** - Make sure API keys are properly set before debugging code

## ⚠️ Important Notes

- The OPENAI_API_KEY must be added to Supabase Project Settings → Edge Functions → Secrets
- OAuth providers must be enabled in Supabase Dashboard → Authentication → Providers
- All AI tests require a valid OpenAI API key to work
- OAuth tests require proper provider configuration
- Server logs are visible in Supabase Dashboard → Edge Functions → Logs
