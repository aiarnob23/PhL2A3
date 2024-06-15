
export interface TBooking  {
   date:Date,
   startTime:String,
   endTime:String,
   user:String,
   facility:String,
   payableAmount:Number,
   isBooked: 'confirmed' | 'unconfirmed' | 'canceled' ;
}