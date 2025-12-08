import React from 'react';

function About() {
  return (
    <div style={{ padding: '40px 20px', color: 'white', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>ℹ️ About BucketsLive</h1>
      <p style={{ opacity: 0.7, marginBottom: '40px' }}>Your ultimate NBA stats and analytics platform</p>
      
      <div style={{ 
        backgroundColor: 'rgb(29, 29, 29)', 
        padding: '40px', 
        borderRadius: '10px',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: 'rgb(0, 168, 255)', marginBottom: '15px' }}>🎯 Project Overview</h2>
        <p style={{ opacity: 0.8, lineHeight: '1.6' }}>
          BucketsLive is a full-stack NBA statistics tracker built with React, AWS, and AI-powered predictions.
          This project demonstrates modern web development practices including serverless architecture,
          cloud deployment, and real-time data integration.
        </p>
      </div>

      <div style={{ 
        backgroundColor: 'rgb(29, 29, 29)', 
        padding: '40px', 
        borderRadius: '10px',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: 'rgb(0, 168, 255)', marginBottom: '15px' }}>🛠️ Tech Stack</h2>
        <ul style={{ opacity: 0.8, lineHeight: '1.8', paddingLeft: '20px' }}>
          <li><strong>Frontend:</strong> React.js with React Router</li>
          <li><strong>Backend:</strong> AWS Lambda, API Gateway</li>
          <li><strong>Database:</strong> DynamoDB</li>
          <li><strong>Authentication:</strong> AWS Cognito</li>
          <li><strong>Deployment:</strong> S3, CloudFront</li>
          <li><strong>AI/ML:</strong> Amazon Bedrock for predictions</li>
        </ul>
      </div>

      <div style={{ 
        backgroundColor: 'rgb(29, 29, 29)', 
        padding: '40px', 
        borderRadius: '10px'
      }}>
        <h2 style={{ color: 'rgb(0, 168, 255)', marginBottom: '15px' }}>👨‍💻 Developer</h2>
        <p style={{ opacity: 0.8, lineHeight: '1.6' }}>
          Built by Vishwa Patel as a portfolio project demonstrating full-stack development
          and cloud architecture skills.
        </p>
      </div>
    </div>
  );
}

export default About;