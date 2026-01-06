const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-2_ThLLhquGO',
      userPoolClientId: '4iaafvhh78m4gsacbkabc3oavg',
      signUpVerificationMethod: 'code',
      loginWith: {
        email: true
      }
    }
  }
};

export default awsConfig;
