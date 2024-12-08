pipeline {
  agent any
  stages {
    stage("build") {
      steps {
        echo 'Building the application.......'
        echo 'Application built.'
        nodejs('nodejs') {
          sh 'npm --version'
        }
      }
    }
    stage("test") {
      steps {
        echo 'Testing the application.......'
      }
    }
    stage("deploy") {
      steps {
        echo 'Deploying the application.......'
      }
    }
  }
}
