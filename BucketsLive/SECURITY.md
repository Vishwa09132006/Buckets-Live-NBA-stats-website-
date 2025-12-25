# Security Best Practices

## IAM User
This project is developed using an IAM user with admin permissions, not the root account.

**IAM User:** bucketslive-admin  
**Permissions:** AdministratorAccess (will be restricted to least privilege later)  
**MFA:** Enabled ✅

## Credentials Management
- ❌ Never commit AWS credentials to Git
- ❌ Never share access keys publicly
- ✅ Rotate keys every 90 days
- ✅ Use environment variables for sensitive data
- ✅ Store credentials in `.env` files (gitignored)

## Root Account Security
- ✅ MFA enabled
- ✅ Access keys removed
- ✅ Only used for account-level changes
- ❌ Not used for daily development

## AWS Resources
All AWS resources are created and managed through:
- IAM user with proper permissions
- AWS CLI configured with IAM credentials
- Console access via IAM user sign-in URL

## Future Security Improvements
- [ ] Create separate IAM roles for different services
- [ ] Implement least privilege permissions per Lambda
- [ ] Use AWS Secrets Manager for API keys
- [ ] Enable CloudTrail for audit logging
- [ ] Set up AWS Organizations for better control
- [ ] Implement resource tagging strategy
- [ ] Add AWS Config for compliance

## Secrets in Code
If you clone this repository:
1. Never commit `.env` files
2. Create your own AWS credentials
3. Configure your own IAM user
4. Don't use credentials from screenshots/documentation

## Incident Response
If credentials are ever compromised:
1. Immediately disable the access keys in IAM
2. Generate new access keys
3. Update local AWS CLI configuration
4. Review CloudTrail logs for unauthorized access
5. Rotate all related secrets

---

**Last Updated:** December 25, 2024  
**Security Contact:** [Your Email - Optional]
```

---

## 💾 Step 4: Save the File

**Press `Ctrl + S` (Windows) or `Cmd + S` (Mac)**

---

## 📁 Step 5: Verify It's in the Right Place

**In VS Code Explorer, you should see:**
```
📁 BucketsLive
  📁 assets
  📁 backend
  📁 frontend
  📁 legacy
  📄 .gitignore
  📄 FEATURES.md
  📄 README.md
  📄 SECURITY.md      ← Should be here!