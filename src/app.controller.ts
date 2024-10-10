import { Body, Controller, Get, Post, Redirect, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  
  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }
  
  @Get('shop')
  @Render('shop.ejs')
  getShop(){

  }
  @Post('shop')
  postProduct(@Body() product, @Res() res:Response){
    console.log(product.product)
    return res.redirect("/userForm?product="+product.product);
  }
  @Get('/userForm')
  @Render('userForm.ejs') 
  getUser(){

  }

}
