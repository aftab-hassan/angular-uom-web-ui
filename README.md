# UOM Web UI

## Steps to Build and Run

1.  install `node.js`
2.  `git clone git@github.build.ge.com:evergreen/uom-web-ui.git`
3.  `cd /uom-web-ui`
4.  run `npm install` 
5.  add environment variables below
6.  run `.\settings admin` to build GE Admin app, or `.\settings user` to build Org Admin app
7.  npm start
8.  open http://localhost:8001 in your browser

## Environment variables

    UOM_WEB_UI_ADMIN_SETTINGS{  
        "clientSettings":{  
            "aadSettings":{  
                "uomAppAadClientId":"cec0259e-6c9e-4e84-8f3b-2e83ed265e9c",
                "aadTenantDomain":"healthcloudbidev01.onmicrosoft.com"
            },
            "log4jsConfig":{  
                "enabled":true,
                "defaultLevel":"INFO",
                "batchSize":1,
                "timeInterval":5000
            },
            "uomApiTimeout":300000
        },
        "cdnUrl":"https://gehcbiartifactsdev.blob.core.windows.net/web-assets/static-resources/7",
        "logSource":"uom-web-ui-admin-int-cd",
        "uomServiceUrl":"https://uom-web-service-int-cd.bi-dashboard-cloud-ase.p.azurewebsites.net",
        "managerServiceUrl":"https://int-dmws.insights.gehealthcare.com",
        "splunkSettings":{  
            "token":"5949247A-A042-4059-B870-517E1208C18C",
            "url":"https://localhost:8088"
        }
    }
        
    UOM_WEB_UI_USER_SETTINGS={  
        "clientSettings":{  
            "aadSettings":{  
                "uomAppAadClientId":"70be96df-092f-408b-aa74-9d9a34722f28"
            },
            "log4jsConfig":{  
                "enabled":true,
                "defaultLevel":"INFO",
                "batchSize":1,
                "timeInterval":5000
            },
            "uomApiTimeout":300000
        },
        "cdnUrl":"https://gehcbiartifactsdev.blob.core.windows.net/web-assets/static-resources/7",
        "logSource":"uom-web-ui-user-int-cd",
        "uomServiceUrl":"https://uom-web-service-int-cd.bi-dashboard-cloud-ase.p.azurewebsites.net",
        "managerServiceUrl":"https://int-dmws.insights.gehealthcare.com",
        "splunkSettings":{  
            "token":"5949247A-A042-4059-B870-517E1208C18C",
            "url":"https://localhost:8088"
        }
    }


## Steps to run unit-tests

...coming soon