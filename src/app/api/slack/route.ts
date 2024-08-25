import { getErrorResponse } from '@/app/utils/helper';
import { config } from '../../../../config';
import ky from 'ky';

type BodyType = {
  location: string;
  message: string;
};

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return getErrorResponse(405, 'Method Not Allowed');
  }

  try {
    const { message, location } = (await req.json()) as BodyType;

    const slackWebhookUrl = config.slack.monitorUrl || '';

    if (!slackWebhookUrl) {
      return getErrorResponse(500, 'Internal Server Error');
    }

    const userAgent = req.headers.get('user-agent') || 'no agent';
    const mobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      );
    const isMobile = mobile ? 'mobile' : 'web';

    await ky.post(slackWebhookUrl, {
      json: {
        text: '*중요*: `코드`는 기본적인 마크다운 형식입니다.',
        attachments: [
          {
            pretext: '메시지 전에 나타나는 텍스트',

            color: '#feb958', // 첨부 파일의 왼쪽에 나타나는 색상 바의 색
            author_name: '문선영',
            author_link: 'https://avatars.githubusercontent.com/u/85778994?v=4',
            author_icon:
              'https://velog.velcdn.com/images/sssssssssy/post/f7383259-1e51-4cb2-b958-c5b85956fb45/image.png',

            title: '제목 : 문선영 블로그',
            title_link: 'https://velog.io/@sssssssssy/posts',

            text: `아래는 \`코드\` 블록입니다:
                  \`\`\`ERROR
\ 접속기종 : ${isMobile}
\ userAgent : ${userAgent}
\ location : ${location}
\n
message
${message?.slice(0, 1200)}
\`\`\``,

            fields: [
              {
                title: '필드 제목 1',
                value: '필드 값 1',
              },
              {
                title: '필드 제목 2',
                value: '필드 값 2',
              },
            ],

            footer_icon:
              'https://ca.slack-edge.com/T071FVABVQS-U0719AQ7LTG-e072cdaace3d-512', // 푸터 왼쪽에 표시할 아이콘
            footer: '푸터 텍스트',
            ts: 1723303945, // 푸터에 타임스탬프를 추가
            image_url: 'https://moon-develog.vercel.app/assets/profile.png', // 첨부 파일에 표시할 이미지 URL
          },
        ],
      },
    });

    return new Response('Hello, world!');
  } catch (error) {
    console.log('error', error);
    return getErrorResponse(500, 'Internal Server Error');
  }
}
