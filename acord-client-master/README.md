# debate-app-client

### Prerequisites
- `npm`

### Start
- In terminal
    - `sudo npm install`
        - in case of error (set admin privileges to npm and config):
            - `sudo chown -R $USER ~/.npm`
            - `sudo chown -R $USER ~/.config`
    - `sudo npm start`

Afterwards, visit: http://localhost:3000

- Before push, run: `grunt`


## Compile and Watch Sass
- `gem install sass`
- `gem install sass-globbing`
- in Terminal, run:
    - sass -r sass-globbing --watch /Users/stefanap/workspaces/acord/client/app
