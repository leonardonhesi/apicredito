# apicredito
Servidor Node.Js, que disponibiliza API para consultas ao Serasa, intermediando as chamadas aos WebServices Serasa.

A Ideia é disponibilizar uma API que recebe via post (Logon,Senha e CNPJ)

http://127.0.0.1:6235/api/consulta
{   "logon": "76565433",
    "senha": "11122233",
    "cnpj" : "3455667788"
}

1-) Utilizando os modulos (soap-cli-simple, wssecurity), realiza a consulta
no webservices do SERASA (https://services.serasaexperian.com.br/RelatoProxy?wsdl) via SOAP.
ATENÇÃO: Esta url é de produção, cada consulta retornada será cobrada pelo Serasa

2-) Apos receber a consulta grava esta consulta (string json) no banco de dados preservando historico,
de aprovação ou não do crédito pelo analista,hoje cliente tem Relato Negativo, e um pedido é rejeitado, semanas
depois cliente regulariza e seu Relato hoje esta positivo, o historico justifica decisão do analista. 

3-) A ideia é que durante um dia sempre que alguem realizar
uma consulta ao CNPJ que exista na base, a consulta retornada seja a consulta da base de dados,
a menos que no frontEnd seja selecionada a opção Nova Consulta (Sujeita a custos), com o objetivo
de reduzir custos e consultas repetidas.

4-) Implementar tambem um contador de consultas, possibilitando atribuir valores em tempo real
da fatura em aberto, bem como auxiliar na conferencia das faturas fechadas do SERASA.

5-) Informações gerenciais, qual logon realizou mais consultas, extratos de consultas e etc.

6-) Integrar via ponto de entrada ao Advpl Protheus, permitindo que na tela de analise de crédito
em ações relacionadas, o sistema realize o post para a API, abrindo o browser por intermédio do protheus.
 
7-) Futuramente desenvolver o frontEnd utilizando Vue.js, o frontend atual está utilizando Angular2 e não
esta neste repositorio, aqui atualizarei com o front utilizando Vue.js.