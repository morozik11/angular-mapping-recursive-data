import { Component, Input } from "@angular/core";

interface Comment {
  id: number;
  text: string;
  children?: Comment[];
}

let comments: Comment[] = [
  {
    id: 1,
    text: "message 1",
    children: [
      {
        id: 3,
        text: "message 3"
      }
    ]
  },
  {
    id: 2,
    text: "message 2",
    children: [
      {
        id: 4,
        text: "message 4",
        children: [
          {
            id: 7,
            text: "message 7"
          },
          {
            id: 8,
            text: "message 8"
          }
        ]
      },
      {
        id: 5,
        text: "message 5"
      }
    ]
  }
];

@Component({
  selector: "app-root",
  template: `<ng-template ngFor let-comment [ngForOf]="comments" let-i="index">
    <app-comment [level]="0" [comment]="comment"></app-comment>
  </ng-template>`,
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  comments: Comment[] = comments;
}

interface Styles {
  marginLeft: string;
  marginTop: string;
}

@Component({
  selector: "app-comment",
  template: `<div [ngStyle]="elementStyles">
    <span style="margin-right: 5px;" *ngIf="showChildren">-</span>
    <span style="margin-right: 5px;" *ngIf="!showChildren">+</span>
    {{ comment?.text }}
    <button (click)="changeVisibility()">Change visibility children</button>
    <ng-template [ngIf]="showChildren && comment?.children">
      <ng-template
        ngFor
        let-childComment
        [ngForOf]="comment?.children"
        let-i="index"
      >
        <app-comment [level]="level+1" [comment]="childComment"></app-comment>
      </ng-template>
    </ng-template>
  </div>`,
  styleUrls: []
})
export class CommentComponent {
  @Input() comment: Comment | null = null;
  @Input() level: number | null = null;
  showChildren = false;

  elementStyles: Styles = {
    marginLeft: `0px`,
    marginTop: `10px`,
  }

  changeVisibility() {
    this.showChildren = !this.showChildren;
  }

  ngOnInit() {
    this.elementStyles.marginLeft = `${this.level * 20}px`
  }
}
