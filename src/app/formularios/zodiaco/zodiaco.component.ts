import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms'; // Importa ReactiveFormsModule
import { CommonModule } from '@angular/common'; // Importa CommonModule para *ngIf

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ], // Asegúrate de incluir los módulos necesarios
  templateUrl: './zodiaco.component.html',
  styleUrls: ['./zodiaco.component.css']
})
export class ZodiacoComponent {
  formulario: FormGroup;  // Declaración del FormGroup
  resultado: any = null;

  signosChinos: { [key: string]: { imagen: string, descripcion: string, anios: number[] } } = {
    'Rata': { imagen: 'https://www.elmagoarcano.com/wp-content/uploads/2017/10/horoscopo-chino-rata.jpg', descripcion: 'Ambicioso', anios: [1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020] },
    'Buey': { imagen: 'https://www.elmagoarcano.com/wp-content/uploads/2017/10/horoscopo-chino-buey.jpg', descripcion: 'Perspicaz', anios: [1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021] },
    'Tigre': { imagen: 'https://www.elmagoarcano.com/wp-content/uploads/2017/10/horoscopo-chino-tigre.jpg', descripcion: 'Idealista', anios: [1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022] },
    'Conejo': { imagen: 'https://www.elmagoarcano.com/wp-content/uploads/2017/10/horoscopo-chino-conejo.jpg', descripcion: 'Sensible', anios: [1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023] },
    'Dragón': { imagen: 'https://www.elmagoarcano.com/wp-content/uploads/2017/10/horoscopo-chino-dragon.jpg', descripcion: 'Responsable', anios: [1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024] },
    'Serpiente': { imagen: 'https://www.elmagoarcano.com/wp-content/uploads/2017/10/horoscopo-chino-serpiente.jpg', descripcion: 'Intuitivo', anios: [1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025] },
    'Caballo': { imagen: 'https://www.elmagoarcano.com/wp-content/uploads/2017/10/horoscopo-chino-caballo.jpg', descripcion: 'Talentoso', anios: [1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026] },
    'Cabra': { imagen: 'https://www.elmagoarcano.com/wp-content/uploads/2017/10/horoscopo-chino-oveja.jpg', descripcion: 'Generoso', anios: [1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027] },
    'Mono': { imagen: 'https://www.elmagoarcano.com/wp-content/uploads/2017/10/horoscopo-chino-mono.jpg', descripcion: 'Inteligente', anios: [1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028] },
    'Gallo': { imagen: 'https://www.elmagoarcano.com/wp-content/uploads/2017/10/horoscopo-chino-gallo.jpg', descripcion: 'Valiente', anios: [1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029] },
    'Perro': { imagen: 'https://www.elmagoarcano.com/wp-content/uploads/2017/10/horoscopo-chino-perro.jpg', descripcion: 'Afectuoso', anios: [1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030] },
    'Cerdo': { imagen: 'https://www.elmagoarcano.com/wp-content/uploads/2017/10/horoscopo-chino-cerdo.jpg', descripcion: 'Honesto', anios: [1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031] }
  };

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      dia: [''],
      mes: [''],
      anio: [''],
      sexo: ['']
    });
  }

  calcularEdad(fechaNacimiento: Date): number {
    const diferenciaMs = Date.now() - fechaNacimiento.getTime();
    const edad = new Date(diferenciaMs);
    return Math.abs(edad.getUTCFullYear() - 1970);
  }

  obtenerSignoChino(anio: number): string {
    const signos = Object.keys(this.signosChinos);
    for (const signo of signos) {
      if (this.signosChinos[signo].anios.includes(anio)) {
        return signo;
      }
    }
    return '';
  }

  imprimir() {
    const { nombre, apaterno, amaterno, dia, mes, anio, sexo } = this.formulario.value;

    const fechaNacimiento = new Date(anio, mes - 1, dia);
    const edad = this.calcularEdad(fechaNacimiento);
    const signo = this.obtenerSignoChino(anio);
    const imagenSigno = this.signosChinos[signo]?.imagen;
    const descripcionSigno = this.signosChinos[signo]?.descripcion;

    this.resultado = {
      nombre,
      apaterno,
      amaterno,
      edad,
      signo,
      descripcionSigno,
      imagenSigno
    };
  }
}

