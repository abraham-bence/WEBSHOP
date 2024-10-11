import { Body, Controller, Get, Post, Redirect, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { orderDto } from './order.dto';

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
  order(@Body() orderDto: orderDto , @Res() res:Response){
    const errors: string[] = []

    if(!orderDto.lastName || !orderDto.firstName){
      errors.push('Minden mezőt kötelező megadni!')
    }
    if (orderDto.coupon && /^[A-Z]{2}-\d{4}$/.test(orderDto.coupon)){
      errors.push("A kuponkód nem megfelelő formátumú!")
    }
    if (errors.length > 0) {
      return res.render('userForm.ejs', {
        errors
      })
    }
  }

}
