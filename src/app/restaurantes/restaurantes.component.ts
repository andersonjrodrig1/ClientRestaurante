import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
    templateUrl: './restaurantes.component.html',
    styleUrls: [
        './restaurantes.component.css'
    ]
})

export class RestaurantesComponent implements OnInit {
    restaurantes: any[];
    hideRestaurante: boolean;
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
    
    buscarRestaurantesPorNome(nome) {
        if(nome == null || nome == undefined)
            nome = '';
        
        var _url: string = `http://localhost:8091/api/restaurante/pesquisar/${nome}`;

        this._http.get(_url)
            .map((dados: Response) => dados.json())
            .subscribe(
                dados => this.restaurantes = dados
            );
    }

    novoCadastroRestaurante(form) {
        this.exibirTelaCadastro();

        form.setValue({
            id: 0,
            nmRestaurante: ''
        })
    }
    
    cancelarCadastro(form){
        this.exibirListaRestaurantes();

        form.setValue({
            nome: ''
        })
    }

    editarRestaurante(restaurante, form) {
        this.exibirTelaCadastro();

        form.setValue({
            id: restaurante.id,
            nmRestaurante: restaurante.nmRestaurante
        })
    }

    excluirRestaurante(restaurante) {
        var _url: string = 'http://localhost:8091/api/restaurante/remover/';

        let body = JSON.stringify(restaurante);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, body: body });

        this._http.delete(_url, options)
            .map((dados: Response) => dados.json())
            .subscribe(
                dados => this.buscarRestaurantes()
            );
    }

    cadastrarRestaurante(id, nmRestaurante) {
        var _url: string = 'http://localhost:8091/api/restaurante/cadastrar/';

        if(id == null || id == undefined)
            id = 0;

        let body = JSON.stringify({
            id: Number(id),
            nmRestaurante: nmRestaurante
        });

        let headers = new Headers({ 'Content-Type': 'application/json' });

        this._http.post(_url, body, { headers: headers })
            .map((dados: Response) => dados.json())
            .subscribe(
                dados => { 
                    this.exibirListaRestaurantes(),
                    this.buscarRestaurantes() 
                });
    }

    private exibirTelaCadastro(){
        this.hideCadastro = false;
        this.hideRestaurante = true;
    }

    private exibirListaRestaurantes() {
        this.hideCadastro = true;
        this.hideRestaurante = false;
    }
    
    ngOnInit(){
        this.exibirListaRestaurantes();
        this.buscarRestaurantes();
    }
 }