import React from 'react'
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';


export default function SearchCards(props) {
  return (
      <Card
        component="li"
        variant="outlined"
        sx={(theme) => ({
          //left: props.left,
          // top: props.top,
          width: 300,
          hight: 1000,
          gridColumn: 'span 1',
          flexDirection: 'row',
          flexWrap: 'wrap',
          resize: 'horizontal',
          overflow: 'hidden',
          gap: 'clamp(0px, (100% - 360px + 32px) * 999, 16px)',
          transition: 'transform 0.3s, border 0.3s',
          '&:hover': {
            borderColor: theme.vars.palette.primary.outlinedHoverBorder,
            transform: 'translateY(10px)',
          },
          '& > *': { minWidth: 'clamp(0px, (360px - 100%) * 999,100%)' },
        })}
      >
        <AspectRatio
          variant="soft"
          sx={{
            flexGrow: 10,
            display: 'contents',
            '--AspectRatio-paddingBottom':
              'clamp(0px, (100% - 360px) * 999, min(calc(100% / (16 / 9)), 300px))',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2000"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
        <Box
          sx={{
            left: "40%",
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            maxWidth: 300,
            top:400,
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <div>
              <Typography sx={{ fontSize: 30 }} mb={0.5}>
                <Link
                  href={props.page}
                  overlay
                  underline="none"
                  sx={{
                    color: 'text.primary',
                    '&.Mui-focusVisible:after': { outlineOffset: '-4px' },
                  }}
                >
                  {props.header}
                </Link>
              </Typography>
              <Typography level="body2">{props.body}</Typography>
            </div>
            <IconButton
              size="lg"
              variant="plain"
              color="neutral"
              sx={{ ml: 'auto', alignSelf: 'flex-start'}}
            >
              <SavedSearchIcon color="danger" />
            </IconButton>
          </Box>
          <AspectRatio
            variant="soft"
            sx={{
              '--AspectRatio-paddingBottom':
                'clamp(0px, (100% - 200px) * 999, 200px)',
              pointerEvents: 'none',
            }}
          >
            <img
              alt=""
              src="https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2262"
            />
          </AspectRatio>
          <Box sx={{ display: 'flex', gap: 0.5}}>
          <IconButton
              size="lg"
              variant="plain"
              color="neutral"
              sx={{ ml: 'auto', alignSelf: 'flex-start'}}
            >
              {props.icon}
            </IconButton>
            <div>
              <Typography level="body2">{props.intro}</Typography>
              <Typography fontWeight="lg" level="body2">
                All the information you want.
              </Typography>
            </div>
          </Box>
        </Box>
      </Card>

  )
}
