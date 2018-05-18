import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  commentForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController, private formBuilder: FormBuilder) {

    this.commentForm = this.formBuilder.group({
        author: ['', Validators.required],
        rating: [3, Validators.required],
        comment: ['', Validators.required],
        date: ['']
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  dismiss() {
    this.viewCtrl.dismiss(this.commentForm.value);
  }

  //这里不能直接删除viewCtrl， 否则数据就无法传输被压栈进入dish.comment 中
  onSubmit() {
    console.log(this.commentForm.value);
    this.dismiss();
  }
}
