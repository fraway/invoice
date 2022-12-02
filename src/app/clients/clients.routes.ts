import { Routes } from "@angular/router";
import { ClientFormComponent } from "./client-form/client-form.component";
import { ClientsListComponent } from "./clients-list/clients-list.component";

export const routes: Routes = [
    {
        path: '',
        component: ClientsListComponent,
        title: 'Lista Clienti'
    },
    {
        path: 'new',
        component: ClientFormComponent,
        title: 'Nuovo Clienti'
    }
];
