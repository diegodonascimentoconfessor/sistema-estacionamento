const {app, BrowserWindow, Menu, shell} = require ('electron')
let mainwindow = null
app.on ('ready', () =>{
    console.log("inciando electron")
    mainwindow =  new BrowserWindow({
        width:800,
        height:800,
        //autoHideMenuBar: true,
        resizable:false,
        icon:'assets/icone_calculadora.png'
    })
    Menu.setApplicationMenu(Menu.buildFromTemplate(Template))
   mainwindow.loadFile('app/index.html')

}) ;


// criando Template Menu 
const Template = [
    {

      label: 'arquivo' ,
      submenu:[

          {
            label:'sair',
            //Evento clique para executar a Função sair 
             click: ()=>app.quit (),
             // Criando tecla de atalho
             accelerator: 'Alt+F4'

          },

      ]

    },

    {
        label: 'exibir',
        submenu: [
           

          
            {
                // para separar submenu com uma linha
                 type: 'separator'

            },

            {
                label:'aplicar zoom',
                role: 'zoomIn'
            },
            {
                label:'Reduzir',
                role:'zoomOut'
            },

            {
                label: 'Restaurar o zoom',
                role: 'resetZoom'
            },

            {
                // para separar submenu com uma linha
                 type: 'separator'

            },



            {
                label: 'ferramenta de dessenvolvedor',
                role: 'toggleDevTools'
            },



        ]
    },

{
    label:'ajuda',
    submenu:  [
        {
        label :'calculadora',
        click: () => shell.openExternal('https://www.google.com.br/search?q=calculadora+google&rlz=1C2CHZN_pt-BRBR1111BR1113&sca_esv=856bbea95b52671d&sxsrf=ADLYWIIRrySlShsuf4fZIJ1C0clT2upgOQ%3A1719513909290&source=hp&ei=NbN9ZsXnD8TS1sQPtpiuwAI&iflsig=AL9hbdgAAAAAZn3BRVvPuht6AXKdylr61kRiNcn012kH&oq=calculadora++goo&gs_lp=Egdnd3Mtd2l6GgIYAyIQY2FsY3VsYWRvcmEgIGdvbyoCCAAyCBAAGIAEGLEDMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAESNBRUNMJWNFAcAF4AJABAJgBugGgAZQVqgEEMC4xNrgBAcgBAPgBAZgCEaACsBaoAgrCAgcQIxgnGOoCwgIKECMYgAQYJxiKBcICDRAAGIAEGLEDGEMYigXCAgoQABiABBhDGIoFwgITEC4YgAQYsQMY0QMYQxjHARiKBcICDBAAGIAEGEMYigUYCsICDhAAGIAEGLEDGIMBGIoFwgIREC4YgAQYsQMY0QMYgwEYxwHCAgQQIxgnwgIWEC4YgAQYsQMY0QMYQxiDARjHARiKBcICCxAuGIAEGNEDGMcBwgIOEC4YgAQYsQMY0QMYxwHCAgsQABiABBixAxiDAZgDDJIHBDEuMTagB4SLAQ&sclient=gws-wiz')
    },
        {
            type: 'separator'

        },

        {
            label:'sobre',
            click: ()=> janelasobre()
        },
          
        
         {
                   
              label:'Documentação',
              click: () => shell.openExternal('https://drive.google.com/file/d/1u07Wab9hcF0b5jXqxZaQ3nZQm9OLjFj0/view?usp=sharing')




         },

    ]
},

]

//criar janela sobre 
const janelasobre =() =>{
    const  sobre  = new  BrowserWindow({
    width:500,
    height:220,
     resizable: false,
     autoHideMenuBar: true,
   
    });
     sobre.loadFile('app/sobre.html')
   }