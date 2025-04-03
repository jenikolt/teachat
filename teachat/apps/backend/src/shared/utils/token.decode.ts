import { JwtService } from '@nestjs/jwt';

export async function decode(
  authorization: string,
  jwtService: JwtService,
): Promise<any> {
  if (!authorization) {
    return Promise.reject('Not valid JWT');
  }

  const [, accessToken] = authorization.split(' ');

  if (!accessToken) {
    return Promise.reject('Not valid JWT');
  }

  return new Promise((res) => {
    jwtService.verifyAsync(accessToken);
    const { sub: payload } = jwtService.decode(accessToken);
    const { id } = JSON.parse(payload);
    res(id);
  }).catch((reason) => reason('Not valid JWT'));
}
