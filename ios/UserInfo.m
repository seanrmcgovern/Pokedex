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
RCT_EXTERN_METHOD(getPartyCount: (RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(incrementPartyCount: (RCTResponseSenderBlock)callback)

@end
