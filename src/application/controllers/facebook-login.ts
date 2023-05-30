import { Controller } from '@/application/controllers';
import { HttpResponse, ok, unauthorized } from '@/application/helpers';
import {
  Validator,
  ValidationBuilder as builder,
} from '@/application/validation';
import { AccessToken } from '@/domain/entities';
import { FacebookAuthentication } from '@/domain/features';

type HttpRequest = {
  token: string;
};

type Model =
  | Error
  | {
      accessToken: string;
    };
export class FacebookLoginController extends Controller {
  constructor(private readonly facebookAuthentication: FacebookAuthentication) {
    super();
  }

  async perform({ token }: HttpRequest): Promise<HttpResponse<Model>> {
    const accessToken = await this.facebookAuthentication.perform({
      token,
    });

    return accessToken instanceof AccessToken
      ? ok({ accessToken: accessToken.value })
      : unauthorized();
  }

  override buildValidators({ token }: HttpRequest): Validator[] {
    return [
      ...builder.of({ value: token, fieldName: 'token' }).required().build(),
    ];
  }
}
