import { assignIn as _assignIn } from 'lodash';

class UserPrincipal {

  static Set(event, selectResult) {
    return _assignIn(event, { UserPrincipal: selectResult });
  }

}

export function authorize(requestSelector: (inboundEvent) => string): any {
  return function wrapper(
    _methodClass: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ): any {
    const originalMethod: any = descriptor.value;
    const value = async function authorizeDescriptor(event: any, context, callback) {
      // eslint-disable-next-line
      console.log('@authorize init event: ', event);
      try {
        await UserPrincipal.Set(event, requestSelector(event));
      } catch (exc) {
        // eslint-disable-next-line
        console.log('exception', exc.toJSON());
        return callback('Unauthorized', null);
      }

      originalMethod.apply(this, [event, context, callback]);
    };

    _assignIn(descriptor, { value });

  };
}
