import { SignUpForm } from '@/components/sign-up-form'

export default function Page() {
  return (
    <div className="relative flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/todo_bg_01.webp')" }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />
      {/* Form */}
      <div className="relative z-10 w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  )
}
