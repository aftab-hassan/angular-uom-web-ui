pipeline {
    agent any

    options {
        disableConcurrentBuilds()
    }

    stages {
        stage('Build') {
            steps {
                bat "npm install"
                bat """
                    REM *** Copy dependencies to app ***
                    SET "GEDEPS=D:\\Jenkins\\workspace\\ge-web-dependencies"
                    if exist node_modules/ge-web-ui-lib/nul ( rmdir /s /q node_modules/ge-web-ui-lib )
                    (robocopy /v /e "%GEDEPS%\\ge-web-ui-lib node_modules/ge-web-ui-lib") ^& if %ERRORLEVEL% equ 1 exit /b 0
                    """
                bat """
                    if exist site/nul ( rmdir /s /q site )
                    if exist dist/nul ( rmdir /s /q dist )
                    if exist uom-web-ui-admin.zip ( del /f /q uom-web-ui-admin.zip )
                    if exist uom-web-ui-user.zip ( del /f /q uom-web-ui-user.zip )
                    """
                bat "settings.bat admin && npm run build"
                bat "npm run test"
                bat "(robocopy /v /e dist site/wwwroot/) ^& if %ERRORLEVEL% equ 1 exit /b 0"
                bat "(robocopy /v /e server modules package.json) ^& if %ERRORLEVEL% equ 1 exit /b 0"
                bat "cd modules && npm install --production"
                bat "(robocopy /v /e modules site/wwwroot/) ^& if %ERRORLEVEL% equ 1 exit /b 0"
                bat "jar -cMf uom-web-ui-admin.zip site"
                bat """
                    rd /q /s dist
                    rd /q /s site
                    """
                bat "settings.bat user && npm run build"
                bat "(robocopy /v /e dist site/wwwroot/) ^& if %ERRORLEVEL% equ 1 exit /b 0"
                bat "(robocopy /v /e modules site/wwwroot/) ^& if %ERRORLEVEL% equ 1 exit /b 0"
                bat "jar -cMf uom-web-ui-user.zip site"
            }
        }
        stage('Upload to Azure') {
            when {
                branch 'master'
                expression {
                    currentBuild.result == null || currentBuild.result == 'SUCCESS' 
                }
            }
            steps {
                bat """
                    set VERSION=0.2.%BUILD_NUMBER%
                    echo %VERSION%>version.txt
                    """
                bat """
                    set /p VERSION=<version.txt
                    powershell ../jenkins-scripts/upload-to-azure.ps1 -AppName uom-web-ui-admin -Version %VERSION%
                    """
                bat """
                    set /p VERSION=<version.txt
                    powershell ../jenkins-scripts/upload-to-azure.ps1 -AppName uom-web-ui-user -Version %VERSION%
                    """
            }
        }
        stage('[latest] Update version') {
            when {
                branch 'master'
                expression {
                    currentBuild.result == null || currentBuild.result == 'SUCCESS' 
              }
            }
            steps {
                bat "if exist azure-deployment-configs/nul ( rmdir /s /q azure-deployment-configs )"
                bat "git clone https://github.build.ge.com/gehc-bia/azure-deployment-configs.git"
                bat '''
                    set /p VERSION=<version.txt
                    cd azure-deployment-configs
                    python updateVersion.py configs/latest.json uom-web-ui-admin %VERSION% 1.0.0.0
                    '''
                bat '''
                    set /p VERSION=<version.txt
                    cd azure-deployment-configs
                    python updateVersion.py configs/latest.json uom-web-ui-user %VERSION% 1.0.0.0
                    '''
                bat "cd azure-deployment-configs && git add configs/latest.json"
                bat '''
                    set /p VERSION=<version.txt
                    cd azure-deployment-configs
                    git commit -m "Jenkins job: Update latest.json uom-web-ui to version %VERSION% with template version 1.0.0.0"
                    '''
                bat "cd azure-deployment-configs && git push"
                bat "rmdir /s /q azure-deployment-configs"
            }
        }
        stage('[int prep] Update version') {
            when {
                branch 'master'
                expression {
                    currentBuild.result == null || currentBuild.result == 'SUCCESS' 
              }
            }
            steps {
                bat "if exist azure-deployment-configs/nul ( rmdir /s /q azure-deployment-configs )"
                bat "git clone https://github.build.ge.com/gehc-bia/azure-deployment-configs.git"
                bat '''
                    set /p VERSION=<version.txt
                    cd azure-deployment-configs
                    python updateVersion.py configs/integration_prep.json uom-web-ui-admin %VERSION% 1.0.0.0
                    '''
                bat '''
                    set /p VERSION=<version.txt
                    cd azure-deployment-configs
                    python updateVersion.py configs/integration_prep.json uom-web-ui-user %VERSION% 1.0.0.0
                    '''
                bat "cd azure-deployment-configs && git add configs/integration_prep.json"
                bat '''
                    set /p VERSION=<version.txt
                    cd azure-deployment-configs
                    git commit -m "Jenkins job: Update integration_prep.json uom-web-ui to version %VERSION% with template version 1.0.0.0"
                    '''
                bat "cd azure-deployment-configs && git push"
                bat "rmdir /s /q azure-deployment-configs"
            }
        }
        stage('[int prep] Deploy') {
            when {
                branch 'master'
                expression {
                    currentBuild.result == null || currentBuild.result == 'SUCCESS' 
                }
            }
            steps {
                parallel (
                  "deploy_uom_web_ui_admin" : {build job: '../Deploy_To_Int_Prep', parameters: [[$class: 'StringParameterValue', name: 'APPLICATION', value: 'uom-web-ui-admin']]},
                  "deploy_uom_web_ui_user" : {build job: '../Deploy_To_Int_Prep', parameters: [[$class: 'StringParameterValue', name: 'APPLICATION', value: 'uom-web-ui-user']]}
                )
            }
        }
        stage('[int live] Update version') {
            when {
                branch 'master'
                expression {
                    currentBuild.result == null || currentBuild.result == 'SUCCESS' 
              }
            }
            steps {
                bat "if exist azure-deployment-configs/nul ( rmdir /s /q azure-deployment-configs )"
                bat "git clone https://github.build.ge.com/gehc-bia/azure-deployment-configs.git"
                bat '''
                    set /p VERSION=<version.txt
                    cd azure-deployment-configs
                    python updateVersion.py configs/integration_live.json uom-web-ui-admin %VERSION% 1.0.0.0
                    '''
                bat '''
                    set /p VERSION=<version.txt
                    cd azure-deployment-configs
                    python updateVersion.py configs/integration_live.json uom-web-ui-user %VERSION% 1.0.0.0
                    '''
                bat "cd azure-deployment-configs && git add configs/integration_live.json"
                bat '''
                    set /p VERSION=<version.txt
                    cd azure-deployment-configs
                    git commit -m "Jenkins job: Update integration_live.json uom-web-ui to version %VERSION% with template version 1.0.0.0"
                    '''
                bat "cd azure-deployment-configs && git push"
                bat "rmdir /s /q azure-deployment-configs"
            }
        }
        stage('[int live] Swap from int prep') {
            when {
                branch 'master'
                expression {
                    currentBuild.result == null || currentBuild.result == 'SUCCESS' 
                }
            }
            steps {
                build job: '../Swap_Int_Prep_To_Int_Live', parameters: [[$class: 'StringParameterValue', name: 'APPLICATION', value: 'uom-web-ui-admin']]
                build job: '../Swap_Int_Prep_To_Int_Live', parameters: [[$class: 'StringParameterValue', name: 'APPLICATION', value: 'uom-web-ui-user']]
            }
        }
    }
    post {
        always {
            publishHTML (target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: false,
                    keepAll: true,
                    reportDir: "coverage\\PhantomJS 2.1.1 (Windows 7 0.0.0)",
                    reportFiles: "index.html",
                    reportName: "Test Coverage Report"
            ])
            catchError {
                emailext body: "Jenkins node: ${env.NODE_NAME}\nBuild name: ${currentBuild.fullDisplayName} \n\nCheck console output at ${env.BUILD_URL} to view the results.",
                    recipientProviders: [[$class: 'CulpritsRecipientProvider'], [$class: 'RequesterRecipientProvider']],
                    subject: "Jenkins job ${env.JOB_NAME} - Build #${env.BUILD_NUMBER} - ${currentBuild.result}!",
                    to: 'healthcare.evergreen.sea@ge.com'
            }
        }
    }
}
