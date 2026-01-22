import React from 'react'
import { Button, Wrapper } from '@ludo/ui'

export default function WelcomeFooter() {
  return (
    <Wrapper className="mb-10 gap-4">
            <Button title="Commencer le jeu" size="xl" redirect="/auth/login" className="w-full" />
            <Button
              title="Rejoindre le jeu"
              variant="outlined"
              redirect="/auth/register/step-1"
              className="w-full"
              size="xl"
            />
          </Wrapper>
  )
}