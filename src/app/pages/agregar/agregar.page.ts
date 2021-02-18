import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaItem } from 'src/app/models/lista-item.model';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/servicios/deseos.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem : string;

  constructor( private deseoServicios: DeseosService,
               private route: ActivatedRoute) { 

    const listId= this.route.snapshot.paramMap.get('listaId');
    this.lista= this.deseoServicios.obtenerLista( listId );

}

  ngOnInit() {
  }

  agregarItem(){
    if( this.nombreItem.length === 0){
      return;
    }
    const nuevoItem = new ListaItem( this.nombreItem );
    this.lista.items.push( nuevoItem );
    this.deseoServicios.guardarStorage();
    this.nombreItem = ''

  }

  cambioCheck( item ) {
     const pendientes = this.lista.items
                                  .filter ( itemData => !itemData.completado )
                                  .length;
      
    if( pendientes === 0 ){
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    }else{
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }
    this.deseoServicios.guardarStorage();

    console.log (this.deseoServicios.listas);
  }
}
