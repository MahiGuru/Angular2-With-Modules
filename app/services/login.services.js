"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/of');
require('rxjs/add/operator/do');
require('rxjs/add/operator/delay');
// Operators
require('rxjs/add/operator/catch');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
require('rxjs/add/operator/map');
require('rxjs/add/operator/switchMap');
require('rxjs/add/operator/toPromise');
var common_serviceUrls_1 = require("./common/common.serviceUrls");
var LoginService = (function () {
    function LoginService(http, jsonp, appHttp) {
        this.http = http;
        this.jsonp = jsonp;
        this.appHttp = appHttp;
        this.baseUrl = 'http://localhost:2000/api/';
        this.isLoggedIn = false;
        this.headers = new http_1.Headers({
            'content-type': 'application/json'
        });
        this.options = new http_1.RequestOptions({
            headers: this.headers
        });
        this.appHttp = new common_serviceUrls_1.AppHttps(this.http);
    }
    LoginService.prototype.UserLoginMethod = function (email, password) {
        return this.appHttp.Get('Customers?filter[where][email]=' + email + '&filter[where][password]=' + password);
    };
    LoginService.prototype.getCustomers = function () {
        return this.http.get(this.baseUrl + 'Customers')
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    LoginService.prototype.getCustomerById = function (id) {
        return this.http.get(this.baseUrl + 'Customers/' + id)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    LoginService.prototype.removeUserById = function (id) {
        return this.http.delete(this.baseUrl + 'Customers/' + id)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    LoginService.prototype.addCustomer = function (customer) {
        console.log("customer From Service >>> ", customer);
        return this.http.post(this.baseUrl + 'Customers/', customer, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    LoginService.prototype.updateCustomer = function (id, customer) {
        return this.http.put(this.baseUrl + 'Customers/' + id, customer, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    LoginService.prototype.extractData = function (res) {
        var body = res.json();
        console.log("RES BODY ", body);
        return body || {};
    };
    LoginService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    LoginService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, http_1.Jsonp, common_serviceUrls_1.AppHttps])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=login.services.js.map