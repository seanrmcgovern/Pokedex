#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(PokeCardBridge, NSObject)


RCT_EXTERN_METHOD(isKantoSaved: (RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(isJohtoSaved: (RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(isHoennSaved: (RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(isSinnohSaved: (RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(isUnovaSaved: (RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(isKalosSaved: (RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(isAlolaSaved: (RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(savePokeCard: (nonnull NSNumber)id generation:(nonnull NSNumber)generation name:(NSString)name height:(nonnull NSNumber)height weight:(nonnull NSNumber)weight catchRate:(nonnull NSNumber)catchRate friendship:(nonnull NSNumber)friendship flavor:(NSString)flavor imageUrl:(NSString)imageUrl types:(NSArray)types stats:(NSArray)stats)

RCT_EXTERN_METHOD(getGeneration: (nonnull NSNumber)gen callback:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(getPokeCard: (nonnull NSNumber)id callback:(RCTResponseSenderBlock)callback)

@end
