export function lookupAccountImageClass(providerAccountId) {
  const id = (typeof providerAccountId === 'number') ? providerAccountId : Number(providerAccountId);
  switch (id) {
    case 4604:
    case 10064:
    case 12656:
    case 12763:
    case 17986:
    case 18350:
    case 19022:
      return 'adp';
    case 9565:
    case 10785:
    case 10899:
      return 'ally';
    case 12:
    case 3017:
    case 9907:
    case 12526:
    case 13638:
    case 14472:
    case 16313:
    case 16941:
    case 16942:
    case 17794:
    case 17835:
    case 17920:
    case 20131:
    case 20242:
    case 20848:
    case 20849:
    case 20918:
      return 'american-express';
    case 9540:
    case 10227:
    case 11631:
    case 20685:
    case 21013:
      return 'aon-hewitt';
    case 6841:
    case 11860:
    case 12220:
      return 'associated-bank';
    case 7430:
    case 10573:
    case 11370:
    case 14222:
    case 20422:
      return 'axa';
    case 2852:
    case 8730:
    case 8817:
    case 12373:
    case 12396:
    case 12532:
    case 17898:
    case 18748:
    case 20147:
    case 21085:
      return 'bank-of-america';
    // case 123:
    //   return 'bank-of-china';
    case 3280:
      return 'bank-united';
    case 3171:
    case 13435:
    case 18755:
      return 'bank-of-the-west';
    case 4118:
    case 7851:
    case 10393:
    case 13626:
    case 13634:
    case 13945:
    case 15210:
    case 16325:
    case 16612:
    case 17786:
    case 19564:
    case 20189:
    case 20191:
    case 20604:
      return 'barclays';
    case 3010:
    case 8701:
    case 9652:
    case 10730:
    case 10755:
    case 10759:
    case 15339:
    case 16111:
    case 17423:
    case 20194:
      return 'bbt';
    case 3935:
    case 4082:
    case 4116:
    case 4175:
    case 13490:
    case 14098:
    case 14770:
      return 'bbva-compass';
    case 3037:
    case 7757:
    case 11525:
    case 13038:
      return 'bmo-harris';
    case 11988:
    case 13461:
    case 21025:
      return 'bny-mellon';
    case 7446:
    case 18172:
      return 'bok-financial';
    case 10657:
    case 13351:
      return 'banco-popular';
    case 2856:
    case 3646:
    case 4064:
    case 4120:
    case 7660:
    case 10689:
    case 12940:
    case 13287:
    case 14516:
    case 21055:
      return 'capital-one';
    case 3446:
    case 10464:
      return 'capital-one-investing';
    case 21:
    case 3648:
    case 3891:
    case 4423:
    case 7627:
    case 9698:
    case 10048:
    case 11323:
    case 11671:
    case 13295:
    case 13696:
    case 19799:
    case 21086:
      return 'charles-schwab';
    case 39:
    case 643:
    case 10803:
    case 15040:
    case 16030:
    case 16388:
    case 17894:
    case 17897:
      return 'chase';
    // case 123:
    //   return 'cit-group';
    case 1503:
    case 1603:
    case 3509:
    case 3536:
    case 4057:
    case 4058:
    case 7619:
    case 7740:
    case 8474:
    case 8646:
    case 9266:
    case 9864:
    case 10388:
    case 10770:
    case 11648:
    case 11667:
    case 12938:
    case 13256:
    case 15416:
    case 17780:
    case 17781:
    case 17957:
    case 18079:
    case 18722:
    case 21074:
      return 'citi';
    case 10721:
    case 11729:
    case 17255:
    case 18496:
      return 'citizens-bank';
    case 3279:
    case 13437:
    case 15768:
    case 19292:
    case 19355:
    case 20049:
      return 'city-national-bank';
    case 3112:
    case 3553:
    case 3710:
    case 3727:
    case 3733:
    case 3755:
    case 4257:
    case 10074:
    case 11088:
      return 'comerica';
    case 2971:
    case 7172:
    case 9786:
    case 10158:
    case 11974:
    case 12688:
      return 'commerce-bank';
    // case 123:
    //   return 'commonwealth-equity'; // checked first 3000
    case 10095:
      return 'credit-one-bank'; // checked first 3000
    case 7021:
    case 11661:
    case 12293:
    case 15316:
      return 'deutsche-bank';
    case 11:
    case 10710:
    case 13141:
    case 14273:
    case 16949:
      return 'discover';
    case 3489:
      return 'east-west-bank';
    case 4374:
    case 20563:
    case 21234:
      return 'empower-retirement';
    case 744:
    case 8843:
    case 17150:
    case 21020:
      return 'e-trade';
    case 3180:
    case 20758:
    case 21099:
      return 'ever-bank';
    case 492:
    case 786:
    case 3810:
    case 4105:
    case 7110:
    case 8478:
    case 8479:
    case 10952:
    case 11107:
    case 11113:
    case 11995:
    case 12289:
    case 13968:
    case 15109:
    case 16414:
    case 20328:
    case 20355:
    case 20853:
    case 20931:
    case 21061:
      return 'fidelity';
    case 745:
    case 8737:
    case 12648:
    case 12780:
    case 13764:
    case 15018:
    case 17290:
      return 'fifth-third-bank';
    case 3677:
    case 11513:
    case 11927:
    case 12668:
    case 13594:
    case 14442:
      return 'first-citizens-bank';
    case 3681:
      return 'first-national-bank';
    case 4414:
    case 8282:
    case 19649:
      return 'first-premier-bank';
    case 458:
    case 11459:
    case 13955:
    case 14221:
    case 14677:
      return 'first-republic';
    case 646:
    case 3807:
    case 3809:
    case 3772:
    case 9360:
    case 11978:
    case 17298:
      return 'first-tennessee';
    case 3918:
    case 9857:
    case 10423:
    case 15228:
      return 'franklin-templeton';
    case 7190:
    case 3580:
    case 10726:
    case 11624:
      return 'frost-bank';
    case 3704:
    case 8253:
    case 11999:
    case 12290:
    case 12495:
    case 14230:
    case 14974:
    case 18061:
    case 18798:
    case 20196:
    case 20295:
      return 'goldman-sachs';
    // case 123:
    //   return 'hancock-bank';
    case 3612:
    case 3968:
    case 4054:
    case 4397:
    case 5363:
      return 'hsbc';
    case 782:
    case 7173:
    case 10984:
    case 12191:
    case 13419:
    case 13975:
      return 'huntington';
    case 10224:
      return 'interactive-brokers';
    case 8221:
    case 20229:
      return 'investors-bank';
    case 3682:
    case 4413:
    case 9663:
    case 9984:
    case 10027:
    case 11446:
    case 14191:
    case 19833:
      return 'john-hancock'; // need to check logo with sites
    case 3513:
    case 8855:
    case 11131:
    case 11245:
    case 11820:
    case 15691:
    case 16795:
    case 18544:
      return 'jp-morgan';
    case 2305:
    case 8648:
    case 15883:
    case 18460:
      return 'key-bank';
    case 9646:
    case 13200:
      return 'lincoln-financial-group';
    case 8485:
    case 11304:
    case 13157:
    case 20241:
      return 'lpl-financial';
    case 18788:
    case 19092:
      return 'mass-mutual';
    case 686:
    case 19813:
      return 'merrill-edge';
    case 8984:
    case 9705:
    case 10367:
    case 10406:
    case 10426:
    case 12026:
    case 12673:
    case 13751:
    case 13803:
    case 21060:
      return 'met-life';
    case 1649:
    case 3956:
    case 4212:
    case 13025:
    case 15133:
    case 17984:
    case 19775:
    case 20719:
      return 'morgan-stanley';
    case 3216:
    case 7194:
    case 10580:
    case 11928:
    case 13123:
    case 18322:
      return 'mt-bank';
    case 6807:
      return 'union-bank';
    case 6902:
    case 8261:
    case 9580:
    case 10665:
    case 11658:
    case 11969:
    case 21104:
      return 'nationwide';
    case 3357:
    case 20940:
      return 'navy-federal';
    case 3002:
    case 10130:
    case 20900:
      return 'newport-group';
    case 4340:
    case 9130:
    case 13334:
    case 14519:
      return 'northern-trust';
    case 18770:
    case 18970:
    case 19456:
      return 'northwestern-mutual';
    case 6501:
    case 11813:
    case 19190:
    case 20300:
      return 'ny-community-bank';
    // case 123:
    // //   return 'options-house';
    case 9028:
      return 'options-xpress';
    case 6495:
      return 'pacific-western-bank';
    case 3084:
    case 4246:
    case 10671:
    case 10720:
    case 17718:
      return 'peoples-united-bank';
    case 3911:
      return 'pimco';
    case 2162:
    case 3768:
    case 4047:
    case 8401:
    case 9641:
    case 10539:
    case 12838:
    case 16871:
    case 18395:
    case 19860:
    case 20630:
    case 20941:
      return 'pnc';
    case 3560:
    case 10338:
    case 11604:
    case 17187:
    case 18163:
      return 'principal';
    case 6775:
    case 6784:
      return 'prosperity-bank';
    case 3651:
    case 3946:
    case 5428:
    case 6882:
    case 7382:
    case 8612:
    case 9949:
    case 11989:
    case 12586:
    case 14567:
    case 16379:
    case 20481:
    case 21052:
    case 21100:
      return 'prudential'; // todo
    case 3955:
    case 6988:
    case 16080:
    case 17933:
      return 'raymond-james';
    case 783:
    case 3762:
    case 4046:
    case 9311:
    case 14257:
    case 14560:
    case 18425:
    case 20414:
      return 'regions';
    case 3589:
    case 14039:
    case 15911:
      return 'sallie-mae';
    case 3846:
    case 3382:
    case 10491:
    case 10822:
    case 12739:
    case 13412:
    case 15547:
    case 16291:
    case 18679:
    case 19361:
    case 19366:
    case 20119:
    case 20357:
    case 20837:
    case 20845:
      return 'santander';
    case 1583:
    case 13158:
    case 16255:
      return 'scottrade';
    case 10512:
      return 'signature-bank';
    case 5239:
    case 14097:
      return 'silicon-valley';
    case 18731:
    case 19399:
      return 'state-farm';
    case 7209:
    case 10454:
    case 10943:
    case 11647:
    case 15310:
    case 17427:
      return 'state-street';
    case 2383:
    case 6842:
    case 7210:
    case 8769:
    case 10416:
    case 10456:
    case 16132:
    case 21111:
      return 'sun-trust';
    case 9655:
      return 'synchrony-bank';
    case 5131:
    case 7211:
    case 12231:
    case 19810:
    case 19811:
      return 'synovus';
    case 4132:
    case 12858:
    case 13928:
    case 20073:
    case 20683:
      return 'td';
    case 291:
    case 9528:
    case 10885:
    case 13790:
    case 16048:
    case 19908:
      return 'td-ameritrade';
    case 12033:
      return 'texas-capital-bank';
    case 11799:
    case 11929:
    case 16281:
    case 18091:
    case 19666:
    case 21056:
      return 'tiaa';
    case 9919:
      return 'trade-king';
    case 8696:
    case 11783:
    case 19472:
      return 'trade-station-securities';
    case 10525:
    case 10542:
    case 10931:
    case 21031:
      return 'trans-america';
    case 6833:
    case 7620:
    case 20415:
    case 21083:
      return 'trans-america-retirement';
    case 93:
    case 3705:
    case 9526:
    case 10568:
    case 17697:
      return 't-rowe-price';
    case 3049:
    case 7055:
    case 18356:
    case 20783:
    case 10368:
    case 11660:
      return 'ubs';
    case 3317:
    case 8086:
    case 8891:
    case 12323:
    case 19597:
      return 'umpqua-bank';
    case 3278:
    case 7056:
    case 12870:
      return 'usaa';
    case 524:
    case 7426:
    case 17893:
    case 18260:
    case 19341:
    case 21096:
      return 'us-bank';
    case 7337:
    case 12618:
      return 'valic';
    case 3121:
    case 15799:
      return 'valley-national-bank';
    case 98:
    case 3697:
    case 17758:
    case 18972:
    case 21080:
    case 21084:
      return 'vanguard';
    case 3030:
    case 7668:
    case 8336:
    case 16202:
    case 19538:
    case 21068:
      return 'voya';
    case 3111:
    case 17106:
      return 'webster-bank';
    case 5:
    case 3008:
    case 3298:
    case 4891:
    case 8582:
    case 8826:
    case 9147:
    case 10527:
    case 10632:
    case 10957:
    case 11545:
    case 12178:
    case 12494:
    case 13286:
    case 14077:
    case 14082:
    case 15025:
    case 16199:
    case 17845:
    case 20137:
      return 'wells-fargo';
    case 3604:
    case 7217:
    case 19236:
      return 'whitney-bank';
    case 7051:
      return 'xerox';
    case 6852:
    case 11842:
      return 'zions-bank';
    default:
      return 'default';
  }
}
