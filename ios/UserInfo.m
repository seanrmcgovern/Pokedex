//
//  UserInfo.m
//  Pokedex
//
//  Created by Sean McGovern on 9/12/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(UserInfo, NSObject)

RCT_EXTERN_METHOD(getCredentials: (RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(saveCredentials: (NSString)username withId: (NSString)userId)
RCT_EXTERN_METHOD(isKantoSaved: (RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(isJohtoSaved: (RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(isHoennSaved: (RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(isSinnohSaved: (RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(isUnovaSaved: (RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(isKalosSaved: (RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(isAlolaSaved: (RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(savePokeCard: (nonnull NSNumber)id generation:(nonnull NSNumber)generation name:(NSString)name height:(nonnull NSNumber)height weight:(nonnull NSNumber)weight catchRate:(nonnull NSNumber)catchRate friendship:(nonnull NSNumber)friendship flavor:(NSString)flavor)
//RCT_EXTERN_METHOD(savePokeCards: (NSDictionaryArray)cards)
//RCT_EXTERN_METHOD(savePokeCards: (NSDictionaryArray *)cards)
RCT_EXTERN_METHOD(getPokeCards)

@end
