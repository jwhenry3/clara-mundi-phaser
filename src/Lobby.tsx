import { useState } from 'react'
import { fixed } from './common.styles'
import { Button, Card, FloatingLabel, TextInput } from 'flowbite-react'
import { IoChevronBack } from 'react-icons/io5'
function Login({ onRegister }: { onRegister(): void }) {
  return (
    <Card className="w-96">
      <h6 className="text-xl">Please Login</h6>
      <div>
        <FloatingLabel required variant="outlined" label="Username *" />
        <FloatingLabel
          required
          variant="outlined"
          label="Password *"
          type="password"
        />
      </div>
      <div className="flex justify-between">
        <Button>Login</Button>
        <Button outline onClick={() => onRegister()}>
          No Account?
        </Button>
      </div>
    </Card>
  )
}
function Register({ onBack }: { onBack(): void }) {
  return (
    <Card className="w-96">
      <h6 className="text-xl flex items-center gap-2">
        <Button size="xs" outline onClick={() => onBack()}>
          <IoChevronBack className="h-5 w-5" />
        </Button>
        Register Account
      </h6>
      <div>
        <FloatingLabel required variant="outlined" label="Username *" />
        <FloatingLabel
          required
          variant="outlined"
          label="Password *"
          type="password"
        />
        <FloatingLabel
          required
          variant="outlined"
          label="Confirm Password *"
          type="password"
        />
      </div>
      <div className="flex justify-between">
        <Button>Register</Button>
      </div>
    </Card>
  )
}
export function Lobby() {
  const [step, setStep] = useState('login')
  return (
    <div className={fixed + ' items-center justify-center'}>
      {step === 'login' && <Login onRegister={() => setStep('register')} />}
      {step === 'register' && <Register onBack={() => setStep('login')} />}
    </div>
  )
}
