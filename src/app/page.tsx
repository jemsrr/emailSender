import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className=" h-fit layout p-8">
      <Card className="p-8 h-fit bg-neutral-800 min-h-screen rounded-xl bg-opacity-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="h-96 rounded-3xl bg-zinc-900 bg-opacity-10 drop-shadow-xl">
          <CardTitle className="m-4">simple</CardTitle>
          <CardContent className="m-4 p-4 ">
            <div className="email-container">
              <div className="email-header">
                <h1>Welcome to Our Service</h1>
              </div>
              <div className="email-content">
                <p>Hello [Recipient Name],</p>
                <p>
                  Thank you for joining our service! We&apos;re glad to have you on
                  board.
                </p>
                <p>Feel free to explore all the features we offer.</p>
                <p>Best regards,</p>
                <p>The [Your Company Name] Team</p>
              </div>
              <div className="email-footer">
                <p>&copy; 2024 [Your Company Name]. All rights reserved.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
}
