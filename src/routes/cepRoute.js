const express = require('express');

const mcache = require('memory-cache')
const axios = require('axios');
const router = express.Router();

router.post('/', function (req, res, next) {
    
    if (req.headers.authorization !== "Basic " + btoa('normal_user:1234') && req.headers.authorization !== "Basic " + btoa('admin_user:1234')) {
        return res.status(401).send({erro: 'Suas credenciais estão incorretas.'})
    }

    res.status(400).send({erro: "Você precisa informar um CEP, '/:cep'"})
})

router.post('/:cep', function (req, res, next) {

    if (req.headers.authorization !== "Basic " + btoa('normal_user:1234') && req.headers.authorization !== "Basic " + btoa('admin_user:1234')) {
        return res.status(401).send({erro: 'Suas credenciais estão incorretas.'})
    }

    let key = '__express__' + req.originalUrl || req.url
    let cepCached = mcache.get(key)

    let cepFormatter = req.params.cep.replaceAll("-", "").replaceAll(".", "")
    let cep = cepFormatter;

    if (cepCached) {
    
        result = [];
        result.push({ fonte: 'Cache'})
        result.push(cepCached)

        res.status(200).send(result);

    } else {
        axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((response) => {

            if (response.data.erro) {

                res.status(400).send({
                    erro: "Esse CEP não foi encontrado, verifique se está correto e tente novamente."
                })

            } else {

                result = [];
                result.push({ fonte: 'ViaCep'})
                result.push(response.data)

                res.status(200).send(result)
                mcache.put(key, response.data, 60 * 5 * 1000)
            }
        }).catch(erro => { 

            res.status(400).send({
                erro: "Esse CEP não foi encontrado, verifique se está correto e tente novamente."
            })

        })
    }
})

module.exports = router;