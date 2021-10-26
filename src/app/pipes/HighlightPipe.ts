import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlight'
})

export class HighlightPipe implements PipeTransform {

    transform(value: any, args: any): any {
        if (!args) {return value;}
        var reg = new RegExp(args, 'gi');
        return value.replace(reg, "<mark>$&</mark>");
    }
}