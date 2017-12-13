import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
    templateUrl: './pratos.component.html',
    styleUrls: [
        './pratos.component.css'
    ]
})

export class PratosComponent implements OnInit {
    pratos: any[];
    restaurantes: any[];
    hidePratos: boolean;
    hideCadastro: boolean;
    
    constructor(private _http: Http) { }

    buscarRestaurantes() {
        var _url: string = 'http://localhost:8091/api/restaurante/buscar';

        this._http.get(_url)
            .map((dados: Response) => dados.json())
            .subscribe(
                dados => this.restaurantes = dados
            );
    }

    buscarPratos() {
        var _url: string = 'http://localhost:8091/api/prato/buscar';
        
        this._http.get(_url)
            .map((dados: Response) => dados.json())
            .subscribe(
                dados => this.pratos = dados
            );
    }

    novoCadastroPrato(cadForm) {
        this.exibirTelaCadastro();
        this.buscarRestaurantes();

        cadForm.setValue({
            id: 0,
            listRest: 0,
            prato: '',
            preco: ''
        });
    }

    cancelarCadastro() {
        this.exibirListaPratos();
    }

    cadastrarPrato(idRest, prato, preco, id){
        var _url: string = 'http://localhost:8091/api/prato/cadastrar/';

        if(id == null || id == undefined)
            id = 0;
        
        let body = JSON.stringify({
            id: id,
            nmPrato: prato,
            vrPreco: parseFloat(preco),
            restaurante: {
                id: idRest
            }
        });

        let headers = new Headers({ 'Content-Type': 'application/json' });

        this._http.post(_url, body, { headers: headers })
            .map((dados: Response) => dados.json())
            .subscribe(
                dados => { 
                    this.exibirListaPratos(),
                    this.buscarPratos() 
                });
    }

    editarPrato(prato, cadForm){
        this.exibirTelaCadastro();
        this.buscarRestaurantes();

        cadForm.setValue({
            id: prato.id,
            listRest: prato.restaurante.id,
            prato: prato.nmPrato,
            preco: prato.vrPreco
        });
    }

    excluirPrato(prato){
        var _url: string = 'http://localhost:8091/api/prato/remover/';
        
        let body = JSON.stringify(prato);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, body: body });

        this._http.delete(_url, options)
            .map((dados: Response) => dados.json())
            .subscribe(
                dados => this.buscarPratos()
            );
    }

    private exibirTelaCadastro() {
        this.hideCadastro = false;
        this.hidePratos = true;
    }

    private exibirListaPratos() {
        this.hideCadastro = true;
        this.hidePratos = false;
    }

    ngOnInit(){
        this.exibirListaPratos();
        this.buscarPratos();
    }
 }