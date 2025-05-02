import React from 'react';
import { Avatar, Button, Card, CardContent, CardFooter, CardHeader, CardTitle, String } from '@chillUI';

interface User {
  id: number;
  image: string;
  message?: string;
  lastname: string;
  firstname: string;
}

type ContactUserCardProps = {
  user: User;
};

export default function ContactUserCard({ user }: ContactUserCardProps) {
  return (
    <Card className="h-56 w-52 justify-between gap-2 px-2">
      <CardHeader>
        <Avatar
          userData={{ firstname: 'John', image_url: 'https://via.placeholder.com/150', lastname: 'Doe' }}
          size="xl"
        />
        <CardTitle className="">{`${user.firstname} ${user.lastname}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <String variant="gray" size="2xs">
          {user.message}
        </String>
      </CardContent>
      <CardFooter>
        <Button title="Suivre" variant="primary" size="xs" />
      </CardFooter>
    </Card>
  );
}
