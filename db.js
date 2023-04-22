const homedir = require('os').homedir();
const home = process.env.HOME || homedir;
const p = require('path');
const fs = require('fs');
const dbPath = p.join(home,'.todo');

const db = {
    read(path = dbPath){ //read(){}接收一个参数path，如果不传就是dbPath ，如果传就用传的
        return new Promise((resolve,reject)=>{
        //a+ 读文件或者追加，如果文件不存在就创建
    fs.readFile(path,{flag:'a+'},(error,data)=>{
        if(error){return reject(error)}
            let list
            try{ 
           list = JSON.parse(data.toString())
        }
        catch(error2){
            list = []
        } 
        resolve(list)
    }) 
    })  
    },
    write(list,path = dbPath){
        return new Promise((resolve,reject)=>{
            const string = JSON.stringify(list)
        fs.writeFile(dbPath,string+'\n',(error)=>{
            if(error){return reject(error)}
            resolve()
        })
        })
        
    }
}

module.exports = db