import * as EasyCert from 'node-easy-cert'
import * as path from 'path'

const certPath = () => {
    const root = path.join(__dirname, '../')
    return path.resolve(root, 'cert')
}

const devHost = '127.0.0.1'

const options = {
    rootDirPath: certPath(),
    inMemory: false,
    defaultCertAttrs: [
        { name: 'countryName', value: 'CN' },
        { name: 'organizationName', value: 'QuickCut' },
        { shortName: 'ST', value: 'SH' },
        { shortName: 'OU', value: 'QuickCut SSL Proxy' }
    ]
}

const crtMgr = new EasyCert(options);
const rootOptions = {
    commonName: 'QuickCut'
};

crtMgr.generateRootCA(rootOptions, (error) => {
    // 如果根证书已经存在，且没有设置overwrite为true，则需要捕获
    if (error === 'ROOT_CA_EXISTED') {
        // 处理当证书已经存在的情形
        return
    }
});

crtMgr.getCertificate(devHost, (error) => {
    const keyFile = path.join(certPath(), '__hostname.key'.replace(/__hostname/, devHost))
    const crtFile = path.join(certPath(), '__hostname.crt'.replace(/__hostname/, devHost));
    if (!error) {
        console.log(keyFile)
        console.log(crtFile)
    }
})