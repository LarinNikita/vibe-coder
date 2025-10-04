import Image from 'next/image';

import SignInFormClient from '@/features/auth/components/signin-form-client';

const SignInPage = () => {
  return (
    <div className="space-y-6 flex flex-col items-center justify-center">
      <Image src={'/logo.svg'} alt="Logo Image" width={300} height={300} />
      <SignInFormClient />
    </div>
  );
};

export default SignInPage;
