"use client";
import Image from "next/image";
import { Typography, Card, CardContent, Button, Box, Chip } from "@mui/material";
import ArticleIcon from '@mui/icons-material/Article';
import EmailIcon from '@mui/icons-material/Email';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleSignupClick = () => {
    router.push('/signup');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] items-center">
        <Image
          className="dark:invert"
          src="/assets/youkie.png"
          alt="Youkie logo"
          width={180}
          height={180}
          priority
        />

        <Card elevation={3} sx={{ maxWidth: 750, width: '100%', borderRadius: 2 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
              Youkie - Your Personal Friendly AI Helper
            </Typography>

            <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
              Let Youkie assist you with summarizing documents, organizing information, and simplifying complex topics.
              Our AI companion transforms how you consume content, making your daily tasks easier and more efficient.
            </Typography>

            <Card variant="outlined" sx={{ mb: 4, bgcolor: 'background.paper', p: 2 }}>
              <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                Summarize Content Across Formats
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <ArticleIcon color="primary" />
                  <Typography variant="body2">
                    <strong>Articles & Blog Posts:</strong> Get key insights from long-form content in seconds. Youkie extracts the most important points so you can quickly decide if a full read is worth your time.
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <EmailIcon color="primary" />
                  <Typography variant="body2">
                    <strong>Emails & Documents:</strong> Handle information overload by condensing lengthy emails and documents into actionable bullet points. Never miss critical information in your inbox again.
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, opacity: 0.8 }}>
                  <AudioFileIcon color="action" />
                  <Box>
                    <Typography variant="body2">
                      <strong>Audio Content:</strong> Coming soon! Youkie will transcribe and summarize podcasts, meetings, and voice notes, helping you capture essential information without replaying hours of content.
                    </Typography>
                    <Chip label="Coming Soon" size="small" sx={{ mt: 1 }} />
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, opacity: 0.8 }}>
                  <VideoFileIcon color="action" />
                  <Box>
                    <Typography variant="body2">
                      <strong>Video Content:</strong> On our roadmap! Youkie will extract key points from lectures, presentations, and tutorials, giving you the essence without watching the full video.
                    </Typography>
                    <Chip label="Coming Soon" size="small" sx={{ mt: 1 }} />
                  </Box>
                </Box>
              </Box>
            </Card>

            <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4 }}>
              Why Choose Youkie?
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mt: 2 }}>
              <Card variant="outlined" sx={{ flex: 1 }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold">Time-Saving</Typography>
                  <Typography variant="body2">Get quick summaries of lengthy documents and articles</Typography>
                </CardContent>
              </Card>

              <Card variant="outlined" sx={{ flex: 1 }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold">Easy to Use</Typography>
                  <Typography variant="body2">Simple interface designed for everyone, no technical skills required</Typography>
                </CardContent>
              </Card>

              <Card variant="outlined" sx={{ flex: 1 }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold">Personalized</Typography>
                  <Typography variant="body2">Adapts to your preferences and learns from your feedback</Typography>
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={handleSignupClick}
                sx={{
                  borderRadius: 28,
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 'medium',
                }}
              >
                Sign Up Now - Its Free!
              </Button>

              <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                Start using Youkie today and experience the difference in how you consume content.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
