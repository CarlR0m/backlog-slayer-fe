import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    //component: Componente principal;
    children : [
      //Vistas Publicas
      {
        path: '',
        //component: ;
      },
      //Vistas Privadas
      {
        path: '',
        //component: ;
      }
    ]
  }
];

export default routes;
