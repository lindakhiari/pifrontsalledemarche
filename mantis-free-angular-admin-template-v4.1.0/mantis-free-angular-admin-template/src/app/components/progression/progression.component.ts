import { Component, OnInit } from '@angular/core';
import { ProgressionService } from '../../services/progression.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progression',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './progression.component.html',
  styleUrls: ['./progression.component.scss']
})
export class ProgressionComponent implements OnInit {
  progressions: any[] = [];

  constructor(private progressionService: ProgressionService) {}

  ngOnInit(): void {
    this.loadProgressions();
  }

  loadProgressions(): void {
    this.progressionService.getAllProgressions().subscribe({
      next: (data) => {
        this.progressions = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des progressions:', error);
      }
    });
  }

  getTrainingDuration(progressionId: number): void {
    this.progressionService.getTrainingDuration(progressionId).subscribe({
      next: (duration) => {
        console.log(`Durée de la formation : ${duration} jours`);
        alert(`La durée de la formation est : ${duration} jours`);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de la durée de la formation:', error);
      }
    });
  }

  updateProgressionStatus(progressionId: number): void {
    this.progressionService.updateProgressionStatus(progressionId).subscribe({
      next: (updated) => {
        console.log('Statut de la progression mis à jour :', updated);
        // Update the local progressions array with the new status
        const index = this.progressions.findIndex(p => p.id === progressionId);
        if (index !== -1) {
          this.progressions[index].status = updated.status; // Assuming the response contains the updated status
        }
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du statut de la progression:', error);
      }
    });
  }
}
