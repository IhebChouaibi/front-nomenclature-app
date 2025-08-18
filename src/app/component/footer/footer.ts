import { Component } from '@angular/core';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YoutubeIcon from '@mui/icons-material/YouTube';
@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  FacebookIcon  =FacebookIcon;
  TwitterIcon = TwitterIcon;
  YoutubeIcon = YoutubeIcon;

}
