pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('docker-login')
        DOCKER_IMAGE_NAME = getDockerImageName(params.DEPLOY_SERVER)
    }
    stages {
        stage('Docker Build') {
            agent any
            steps {
                script {
                    sh '''
                        echo "Docker Image Name: ${DOCKER_IMAGE_NAME}"
                        docker build --no-cache -t ${DOCKER_IMAGE_NAME} .
                    '''
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                echo 'Login Completed'
            }
        }

        stage('Docker Push') {
            agent any
            steps {
                sh 'docker push ${DOCKER_IMAGE_NAME}'
            }
        }

        stage('SSH Connect') {
            when {
                expression { params.DEPLOY_SERVER != null }
            }
            steps {
                script {
                    def deployServer = params.DEPLOY_SERVER
                    def composeFile
                    def ip

                    if (deployServer == 'TESTING') {
                        composeFile = 'testing.yml'
                        ip = '64.227.160.171'
                    } else if (deployServer == 'UAT') {
                        composeFile = ''
                        ip = ''
                    } else {
                        error "Unsupported server: ${deployServer}"
                    }

                    env.DEPLOY_SERVER = deployServer
                    env.COMPOSE_FILE = composeFile
                    env.IP = ip

                    sshagent(credentials: ['ssh-key']) {
                        sh '''
                            echo "Deploy Server: ${DEPLOY_SERVER}"
                            echo "Compose File: ${COMPOSE_FILE}"
                            echo "IP: ${IP}"
                            [ -d ~/.ssh ] || mkdir ~/.ssh && chmod 0700 ~/.ssh
                            ssh-keyscan -t rsa,dsa ${IP} >> ~/.ssh/known_hosts
                            ssh root@${IP} "docker compose -f ${COMPOSE_FILE} pull ; docker compose -f ${COMPOSE_FILE} up -d"
                        '''
                    }
                }
            }
        }
    }
}

def getDockerImageName(deployServer) {
    switch (deployServer) {
        case 'TESTING':
            return 'kugelblitz03/gravitonweb:testing'
        case 'UAT':
            return ''
        default:
            error "Unsupported server: ${deployServer}"
    }
}
