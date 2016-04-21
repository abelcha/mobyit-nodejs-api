var MD5 = require('md5')
var _ = require("lodash");
var requestp = require("request-promise")
var Mobyt = function(user, pass, name) {

    this.user = user;
    this.pass = pass;
    this.name = name

}

Mobyt.prototype.getTicket = function(params) {
    return MD5(_.reduce(params, function(total, p) {
        return total += p;
    }))
}


Mobyt.prototype.send = function(params) {
    var _this = this;

    return new Promise(function(resolve, reject) {
        if (!params.text || !params.to) {
            return reject("Invalid Parameters");
        }

        var f = {
            user: _this.user,
            pass: _this.pass,
            data: params.text + "\nSTOP 36608",
            rcpt: params.to.length == 10 ? params.to.replace('0', '+33') : params.to,
            sender: _this.name,
            qty: 'n',
            operation: 'MULTITEXT',
            domaine: "http://multilevel.mobyt.fr",
            return_id: "1",
        };
        f.ticket = _this.getTicket([f.user, f.rcpt, f.sender, f.data, f.qty, MD5(f.pass)])
        requestp.post({
                url: 'http://multilevel.mobyt.fr/sms/send.php',
                form: f
            })
            .then(function(response) {
                if (response.startsWith('OK')) {
                    params.id = response.substr(3);
                    resolve(params);
                } else {
                    reject(response);
                }
            }, function(err) {
                reject(err);
            });
    });

};

module.exports = Mobyt;
