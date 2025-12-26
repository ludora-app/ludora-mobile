import { String } from '@ludo/ui';

type CreateSessionTitleProps = {
  title: string;
};
export default function CreateSessionTitle(props: CreateSessionTitleProps) {
  const { title } = props;
  return (
    <String className="py-5 text-center" variant="body-2" font="primaryBold">
      {title}
    </String>
  );
}
