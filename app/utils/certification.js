const crypto = require("crypto");
const padding = crypto.constants.RSA_PKCS1_PADDING;
const NodeRSA = require("node-rsa");
const fs = require("fs");
const privatePem = `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQDeAnqclR2Mh+jTz2nKYEBFiK3HGJzuoELOTeBVStx6smImfTrm
8BXnPWIqN/wv78cztB1peQfP12KPtamyez94fSJS0izTrz9D7fQAa0aih1trVq4N
1fEaCnprbU5/NH5bup91h4pp7KihPkVmQcyLNDNsaZ5vBrHqOygMX1qH8QIDAQAB
AoGAIQ5Bb1sMgUYjNpZlbAqUx0WoikJx613VVJ5nzotM9L/muVBgGs6YlEuheCPJ
2uFayaoBzxiEP0AUns0vrTGIq4MAVtrBly2dslI35lrNxx/gzfPjaNRjHsqhPs+o
UijYQ4aEy6wXepgUUZ/1Rdw6TK23ssG4x7GNZ7nv7WWK1ZkCQQD1aofR2Dvi9pmv
EVPTUK9ABOwerqvudIBcuP2JpYewUZhwFTkej8GvuTwfMGLQ960ACUXwYhG3NJxp
LuF5hNTLAkEA55WItAcYyhwRPvwN9YLH8pnfYK2rDWx2Du26eLJqjUsiFWEzGYJ7
wVhKMnjrr18MsQhmWDEmu7StsyFTDRN6swJBAMUF/4AifwGZRIxd9tQhZHCbAw0m
4fUQJrVJ9pH5CFQvTZg+EZtNgguXRIMtj0eAb60lxLZVpS9V13RCJNYwI70CQQCy
pnOP1c201JQlT5KBLAONTlC5JyBGub4VZCUuyQxTtXs0nQgrjLJlg/OxHgFLB3sl
8sHpFPm5YfeBsZp9AuLrAkBA61Li4GaTgwA7PQ3e9KRF2XFIKeS/tLkH1bxuD5R5
/isS+plfjKKbMeLVE3Gm4pDGSYCSIlJojO7zyVspU4kF
-----END RSA PRIVATE KEY-----
`
module.exports = {
    // data的参数类型为buffer
    MD5Hash (data, callback) {
        // 计算该文件的md5值
        const fsHash = crypto.createHash("md5");
        fsHash.update(data);
        const md5 = fsHash.digest("hex");
        console.log("文件的MD5是：%s", md5);
        callback(md5);
    },
    // 使用私钥解密
    Decrypt (EnDataStr) {

        const key = new NodeRSA(privatePem);
        try {
            const decrypted = key.decrypt(EnDataStr, "utf8");
            return decrypted
        } catch (error) {
            return ''
        }


        // fs.exists(privateKeyPath, function (exists) {
        //     if (exists) {
        //         // console.info(EnDataStr)
        //         const pem = fs.readFileSync(privateKeyPath, "utf8");
        //         const key = new NodeRSA(pem);
        //         const decrypted = key.decrypt(EnDataStr, "utf8");
        //         // console.log("decrypted:" + decrypted);
        //         callback(decrypted);
        //     }
        // });
    },

    // 使用公钥加密
    Encrypt (publicKeyPath, dataStr, callback) {
        fs.exists(publicKeyPath, function (exists) {

            if (exists) {
                const pem = fs.readFileSync(publicKeyPath, "utf8");
                const key = new NodeRSA(pem);
                const encrypted = key.encrypt(dataStr, "base64");
                // console.log("encrypted:" + encrypted);

                callback(encrypted);
            }
        });
    },
    // 生成公钥和私钥
    Generator: function generator (publicPemPath, privatePemPath) {
        // const publicKeyPath = "./pem/public.pem";
        // const privateKeyPath = "./pem/private.pem";
        const key = new NodeRSA({ b: 512 });
        key.setOptions({ encryptionScheme: "pkcs1" });

        const publicKey = key.exportKey("public");
        fs.writeFile(publicPemPath, publicKey, err => {
            if (err) throw err;
            console.log("公钥已保存");
        });
        const privateKey = key.exportKey("private");
        fs.writeFile(privatePemPath, privateKey, err => {
            if (err) throw err;
            console.log("私钥已保存");
        });
    },
    // 使用私钥签名
    SignData: function SignData (privateKeyPath, dataStr, callback) {
        fs.exists(privateKeyPath, function (exists) {
            if (exists) {
                const pem = fs.readFileSync(privateKeyPath, "utf8");
                const key = new NodeRSA(pem);
                const signOut = key.sign(dataStr, "base64");
                console.log("=====signOut=======" + signOut);
                callback(signOut);
            }
        });
    },
    // 验证签名
    VerySign: function VerySign (publicKeyPath, dataStr, signStr, callback) {
        fs.exists(publicKeyPath, function (exists) {
            if (exists) {
                const pem = fs.readFileSync(publicKeyPath, "utf8");
                const key = new NodeRSA(pem);
                const verifySign = key.verify(
                    Buffer.from(dataStr),
                    signStr,
                    "base64",
                    "base64"
                );
                console.log("------verifySign------" + verifySign);
                callback(verifySign);
            }
        });
    },

    SelfSign: function SelfSign (attrs, savePath) {
        const selfsigned = require("selfsigned");
        // var attrs = [
        //   { name: "commonName", value: "contoso.com", card: "130521199203080776" }
        // ];
        const pems = selfsigned.generate(attrs, { days: 365 });
        console.log(pems);
        const privateCert = pems.private;
        const publicCert = pems.public;
        const cert = pems.cert;
        this.SaveData(privateCert, "private.pem", savePath);
        this.SaveData(publicCert, "public.pem", savePath);
        this.SaveData(cert, "cert.pem", savePath);
        console.log("----private-------" + pems.private);
    },
    SaveData: function SaveData (data, fileName, filePath) {
        console.info(filePath + "/" + fileName)
        fs.writeFile(
            filePath + "/" + fileName,
            data,
            { flag: "w", encoding: "utf-8", mode: "0666" },
            function (err) {
                if (err) {
                    console.log("文件写入失败");
                } else {
                    console.log("文件写入成功");
                }
            }
        );
    }
};
