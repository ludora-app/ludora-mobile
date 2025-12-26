import { String } from '@ludo/ui';

type CreateSessionSubtitleProps = {
  title: string;
};
export default function CreateSessionSubtitle(props: CreateSessionSubtitleProps) {
  const { title } = props;

  return (
    <String size="sm" className="mb-3 text-black/60" font="primarySemiBold">
      {title}
    </String>
  );
}
