import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map } from "rxjs";


export class CollectionInterceptor implements NestInterceptor {


    private meta: any;


    intercept(context: ExecutionContext, next: CallHandler) {


        const request = context.switchToHttp().getRequest();

        return next.handle().pipe(

            map((data) => {

                // if data was pagination this brucket is going to execute
                if (Array.isArray(data) && typeof data[1] === 'number') {

                    const entities = data[0];
                    const total = data[1];
                    const page = Number(request.query.page) || 1;
                    const limit = Number(request.query.limit) || 10;
                    const offset = (page - 1) * limit;


                    return {
                        entities: entities.map(this.transformEntity),
                        meta: {
                            total: total,
                            current_page: page,
                            per_page: limit,
                            last_page: Math.ceil(total / limit),
                            from: total === 0 ? 0 : offset + 1,
                            to: Math.min(offset + entities.length, total)
                        }
                    };

                }

                // if data was a simple list of objects , this brucket is going to execute
                if (Array.isArray(data)) {

                    if (typeof data[1] !== 'number') {
                        return {
                            entities: data.map(this.transformEntity),
                        };
                    }
                }


                // if data was a simple object , this brucket is going to execute
                return this.transformEntity(data)

            })
        )
    }




    protected setMeta(newMeta: object) {
        this.meta = newMeta
    }





    protected transformEntity : any ;

}