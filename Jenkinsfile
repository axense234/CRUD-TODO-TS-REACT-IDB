pipeline {
  agent any
  stages {
    stage('Git Setup') {
      parallel {
        stage('Git Setup') {
          steps {
            git(url: 'https://github.com/axense234/CRUD-TODO-TS-REACT-IDB.git', branch: 'master')
          }
        }

        stage('NPM Check') {
          steps {
            sh 'npm --version'
          }
        }

      }
    }

    stage('AWS ECR Login') {
      steps {
        sh 'aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/g6t2k7y6'
      }
    }

    stage('Docker Build') {
      steps {
        sh 'docker build -t crud-todo-react-idb .'
      }
    }

    stage('AWS ECR Push') {
      steps {
        sh 'docker tag crud-todo-react-idb:latest public.ecr.aws/g6t2k7y6/crud-todo-react-idb:latest'
        sh 'docker push public.ecr.aws/g6t2k7y6/crud-todo-react-idb:latest'
      }
    }

  }
}