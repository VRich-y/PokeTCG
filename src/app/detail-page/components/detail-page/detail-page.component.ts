import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../../../services/api-service.service';
import { fadeInOut } from '../../../shared/animations';
import { PokemonCardData, PokemonCardInfo } from '../../../shared/models/pokemon-card';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
  animations: [fadeInOut]
})
export class DetailPageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private pokeApi: ApiServiceService
  ) {  }

  ngOnInit(): void {
    this.findCardInfo(this.id);
  }

  id: string = this.route.snapshot.paramMap.get('id')!;
  card: PokemonCardData;

  findCardInfo(id: string) {
    this.pokeApi.getCardsInfo(id).subscribe({
      next: (value: PokemonCardInfo) => {
        this.card = value.data;
      },
    })
  }

  getImages(path: string) {
    const a = `../../../../assets/TCG-types/${path}.png`;
    return a;

  }
}
